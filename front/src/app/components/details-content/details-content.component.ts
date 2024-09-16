import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService, Player } from '../../services/player.service';
import { FormField } from '../../app.component';
import { TeamService } from '../../services/team.service';
import { LeagueService } from '../../services/league.service';

@Component({
  selector: 'app-details-content',
  templateUrl: './details-content.component.html',
  styleUrl: './details-content.component.scss',
})
export class DetailsContentComponent implements OnInit {
  @Input() dataType: 'team' | 'player' = 'team';
  @Input() teamId: number = 0;
  @Input() playerId: number = 0;

  fields: FormField[] = [];

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private teamService: TeamService,
    private leagueService: LeagueService
  ) {}

  ngOnInit() {
    if (this.dataType === 'player') {
      this.loadPlayerDetails();
    } else if (this.dataType === 'team') {
      this.loadTeamDetails();
    }
  }

  private async loadPlayerDetails() {
    try {
      const player = await this.playerService.getPlayer(this.playerId);

      player.team_name = await this.playerService.getTeamName(player.team_id);

      const fields = this.playerService.generatePlayerFields(player);
      this.fields = [...fields.slice(1, 5), ...fields.slice(6, 7)];
    } catch (error) {
      console.error('Error loading player details:', error);
    }
  }

  private async loadTeamDetails() {
    try {
      const team = await this.teamService.getTeam(this.teamId);

      // Pobierz ligi przed przekazaniem ich do generateTeamFields
      const leagues = await this.leagueService.getLeagues();
      team.league_name = await this.teamService.getLeagueNameById(
        team.league_id
      );
      team.creator_username = await this.teamService.getCreatorUsernameById(
        team.creator_id
      );
      const fields = this.teamService.generateTeamFields(team, leagues);
      this.fields = [...fields.slice(1, 5), ...fields.slice(6, 7)];
    } catch (error) {
      console.error('Error loading team details:', error);
    }
  }
}
