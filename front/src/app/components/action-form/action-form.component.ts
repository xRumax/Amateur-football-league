import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { ActionService } from '../../services/action.service';
import { MatchAction } from '../../services/action.service';
import { MatchService } from '../../services/match.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrl: './action-form.component.scss',
})
export class ActionFormComponent {
  @Input() matchId!: number;
  @Input() teamId!: number;
  form: FormGroup = new FormGroup({});
  teams: any[] = [];
  players: any[] = [];
  formFields: any[] = [];
  action: any = {};

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private actionService: ActionService
  ) {}

  ngOnInit(): void {
    this.initializeActionForm();
  }

  initializeForm(fields: any[]): void {
    const group: Record<string, any> = {};
    fields.forEach((field) => {
      group[field.name] = new FormControl(field.value || '');
    });
    this.form = new FormGroup(group);

    // listener for team_id changes
    this.form.get('team_id')?.valueChanges.subscribe((teamId) => {
      if (teamId) {
        this.loadPlayersByTeamId(teamId);
      }
    });
  }

  async initializeActionForm(): Promise<void> {
    try {
      this.teams = await this.matchService.getTeamsByMatchId(this.matchId);
      this.formFields = this.actionService.generateActionFields(
        this.action,
        this.players,
        this.teams
      );
      this.initializeForm(this.formFields);
    } catch (error) {
      console.error('Error initializing action form:', error);
    }
  }
  async loadPlayersByTeamId(teamId: number): Promise<void> {
    try {
      this.players = await this.playerService.getPlayerByTeamId(teamId);
      console.log('Players:', this.players);

      const playerField = this.form.get('player_id');
      if (playerField) {
        playerField.setValue('');
        playerField.setValidators([]);
        playerField.updateValueAndValidity();
      }
      this.formFields = this.actionService.generateActionFields(
        this.form.value,
        this.players,
        this.teams
      );
      console.log('Fields:', this.formFields);
      this.initializeForm(this.formFields);
    } catch (error) {
      console.error('Error loading players by team ID:', error);
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      const action: MatchAction = this.form.value;
      this.actionService
        .createAction(action)
        .then((response) => {
          console.log('Action created:', response);
        })
        .catch((error) => {
          console.error('Error creating action:', error);
        });
    }
  }
}
