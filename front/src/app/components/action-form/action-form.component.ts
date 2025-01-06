import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { ActionService, Action } from '../../services/action.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.scss'],
})
export class ActionFormComponent implements OnInit {
  @Input() matchId!: number;
  @Input() formIndex!: number;
  @Input() formGroup!: FormGroup;
  @Input() tournamentId!: number;
  teams: any[] = [];
  players: any[] = [];
  formFields: any[] = [];
  action: Action = {
    id: 0,
    action_type: '',
    minute: 0,
    match_id: 0,
    player_id: 0,
    team_id: 0,
    tournament_id: 0,
  };

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private actionService: ActionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeActionForm();
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
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error initializing action form:', error);
    }
  }

  initializeForm(fields: any[]): void {
    fields.forEach((field) => {
      const control = new FormControl(field.value || '', Validators.required);
      this.formGroup.addControl(field.name, control);
    });

    this.formGroup.get('team_id')?.valueChanges.subscribe((teamId) => {
      if (teamId) {
        this.loadPlayersByTeamId(teamId);
      }
    });
  }

  async loadPlayersByTeamId(teamId: number): Promise<void> {
    try {
      this.players = await this.playerService.getPlayerByTeamId(teamId);

      const playerField = this.formGroup.get('player_id');
      if (playerField) {
        playerField.setValue('');
        playerField.setValidators([]);
        playerField.updateValueAndValidity();
      }
      this.formFields = this.actionService.generateActionFields(
        this.formGroup.value,
        this.players,
        this.teams
      );
      this.initializeForm(this.formFields);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading players by team ID:', error);
    }
  }
}
