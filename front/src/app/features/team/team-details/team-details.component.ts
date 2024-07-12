import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Team, TeamService } from '../../../services/team.service';
import { Player } from '../../../services/player.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss'],
})
export class TeamDetailsComponent implements OnInit {
  totalNumOfGoals: number = 0;
  totalNumOfYellowCards: number = 0;
  totalNumOfRedCards: number = 0;

  dataSource = new MatTableDataSource<Player>(); // Initialize dataSource here
  staticsDataSource = new MatTableDataSource<any>([]); // Additional dataSource for statics
  id: number = 0; // Initialize id as number
  team: Team | undefined;
  playerColumns = [
    { key: 'name', header: 'Name' },
    { key: 'num_of_goals', header: 'Goals' },
    { key: 'num_of_yellow_cards', header: 'Yellow Cards' },
    { key: 'num_of_red_cards', header: 'Red Cards' },
  ];

  staticsColumns = [
    { key: 'num_of_goals', header: 'Goals' },
    { key: 'num_of_yellow_cards', header: 'Yellow Cards' },
    { key: 'num_of_red_cards', header: 'Red Cards' },
  ];

  teamDetails: { key: keyof Team; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'matches_played', label: 'Matches played' },
    { key: 'league_name', label: 'League' },
    { key: 'creator_username', label: 'Creator' },
  ];

  playerColumnKeys: string[] = [];
  staticsColumnKeys: string[] = [];

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.playerColumnKeys = this.playerColumns.map((column) => column.key);
    this.staticsColumnKeys = this.staticsColumns.map((column) => column.key);
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.id = Number(routeId);
    }

    this.team = await this.teamService.getTeam(this.id);
    if (this.team) {
      const leagueNamePromise = this.team.league_id
        ? this.teamService.getLeagueNameById(this.team.league_id)
        : Promise.resolve(null);
      const creatorUsernamePromise = this.team.creator_id
        ? this.teamService.getCreatorUsernameById(this.team.creator_id)
        : Promise.resolve(null);

      const [leagueName, creatorUsername] = await Promise.all([
        leagueNamePromise,
        creatorUsernamePromise,
      ]);

      if (this.team.league_id) {
        this.team.league_name = leagueName ?? undefined; // Set the league name
      }
      if (this.team.creator_id) {
        this.team.creator_username = creatorUsername ?? undefined; // Set the creator username
      }
    }
    this.dataSource.data = this.team?.players || [];
  }
}
