import { Component, OnInit } from '@angular/core';
import { Player } from '../../../services/player.service';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../../services/player.service';
import { TeamService } from '../../../services/team.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss',
})
export class PlayerDetailsComponent implements OnInit {
  player: Player | undefined;
  playerId: number = 0;
  dataSource = new MatTableDataSource<Player>(); // Initialize dataSource here

  playerDetails: { key: keyof Player; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'date_of_birth', label: 'Birthday' },
    { key: 'sex', label: 'Sex' },
    { key: 'team_name', label: 'Team Name' },
  ];

  playerColumns = [
    { key: 'num_of_goals', header: 'Goals' },
    { key: 'num_of_assists', header: 'Assists' },
    { key: 'num_of_yellow_cards', header: 'Yellow Cards' },
    { key: 'num_of_red_cards', header: 'Red Cards' },
    { key: 'num_of_matches_played', header: 'Matches Played' },
    { key: 'minutes_played', header: 'Minutes Played' },
  ];

  playerColumnKeys: string[] = [];

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  async ngOnInit(): Promise<void> {
    const routeId = this.route.snapshot.paramMap.get('id');
    let teamNamePromise: Promise<string | null> = Promise.resolve(null);
    if (routeId) {
      this.playerId = Number(routeId);

      this.player = await this.playerService.getPlayer(this.playerId);
      if (this.player && this.player.team_id) {
        teamNamePromise = this.teamService.getTeamNamebyId(this.player.team_id);
      }
      const [teamName] = await Promise.all([teamNamePromise]);

      if (this.player && this.player.team_id) {
        this.player.team_name = teamName ?? undefined; // Set the league name
      }
      this.player.num_of_goals = this.player.num_of_goals || 0;
      this.player.num_of_assists = this.player.num_of_assists || 0;
      this.player.num_of_yellow_cards = this.player.num_of_yellow_cards || 0;
      this.player.num_of_red_cards = this.player.num_of_red_cards || 0;
      this.player.num_of_matches_played =
        this.player.num_of_matches_played || 0;
      this.player.minutes_played = this.player.minutes_played || 0;
    }

    this.playerColumnKeys = this.playerColumns.map((column) => column.key);

    // Assign player data to dataSource
    if (this.player) {
      this.dataSource.data = [this.player];
    }
  }
}
