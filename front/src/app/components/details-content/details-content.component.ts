import { Component, Input, OnInit } from '@angular/core';
import { PlayerService, Player } from '../../services/player.service';
import { FormField } from '../../app.component';
import { TeamService } from '../../services/team.service';

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
    private teamService: TeamService
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

      team.creator_username = await this.teamService.getCreatorUsernameById(
        team.creator_id
      );
      const fields = this.teamService.generateTeamFields(team);
      this.fields = [
        ...fields.slice(1, 3),
        ...fields.slice(4, 5),
        ...fields.slice(6, 7),
      ];
    } catch (error) {
      console.error('Error loading team details:', error);
    }
  }
}
