import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Team, TeamService } from '../../../services/team.service';
import { Player, PlayerService } from '../../../services/player.service';

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
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.staticsColumnKeys = this.teamService.staticsColumns.map(
      (column) => column.key
    );
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.id = Number(routeId);
      this.team = await this.teamService.getTeam(this.id);
      const players = await this.playerService.getPlayerByTeamId(this.id);

      this.dataSource.data = players;

      // Calculate totals
      this.totalNumOfGoals = players.reduce(
        (sum: number, player: any) => sum + (player.num_of_goals || 0),
        0
      );
      this.totalNumOfYellowCards = players.reduce(
        (sum: number, player: any) => sum + (player.num_of_yellow_cards || 0),
        0
      );
      this.totalNumOfRedCards = players.reduce(
        (sum: number, player: any) => sum + (player.num_of_red_cards || 0),
        0
      );

      // Update staticsDataSource with totals
      this.staticsDataSource.data = [
        {
          num_of_goals: this.totalNumOfGoals,
          num_of_yellow_cards: this.totalNumOfYellowCards,
          num_of_red_cards: this.totalNumOfRedCards,
        },
      ];
    }
  }

  addPlayer(): void {
    // Logic to add a new player
    console.log('Add player button clicked');
  }
}
