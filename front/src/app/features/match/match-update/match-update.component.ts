import { Component, Input, OnInit } from '@angular/core';
import { MatchService, Match } from '../../../services/match.service';
import { ActionService, Action } from '../../../services/action.service';
import { ActivatedRoute } from '@angular/router';
import { Player, PlayerService } from '../../../services/player.service';
import { Team, TeamService } from '../../../services/team.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-match-update',
  templateUrl: './match-update.component.html',
  styleUrls: ['./match-update.component.scss'],
})
export class MatchUpdateComponent implements OnInit {
  @Input() matchId: number = 0;
  @Input() teamId: number = 0;
  match: Match | null = null;
  actionForms: FormGroup[] = [];
  players: Player[] = [];
  teams: Team[] = [];

  constructor(
    private matchService: MatchService,
    private snackBar: MatSnackBar,
    private actionService: ActionService,
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private teamService: TeamService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.matchId = Number(routeId);
      this.match = await this.matchService.getMatchById(this.matchId);
      this.players = await this.playerService.getAllPlayers();
      this.teams = await this.teamService.getAllTeams();
      this.addNewForm();
    }
  }

  addNewForm(): void {
    const action: Action = {
      id: 0,
      action_type: '',
      minute: 0,
      match_id: this.matchId,
      player_id: 0,
      team_id: 0,
      tournament_id: this.match?.tournament_id ?? 0,
    };

    const formFields = this.actionService.generateActionFields(
      action,
      this.players,
      this.teams
    );

    const group: Record<string, any> = {};
    formFields.forEach((field) => {
      group[field.name] = new FormControl(field.value || '');
    });

    const formGroup = new FormGroup(group);
    this.actionForms.push(formGroup);
  }

  async submitAllForms(): Promise<void> {
    const allActions = this.actionForms.map((formGroup) => {
      const formFields = Object.keys(formGroup.controls).map((key) => ({
        name: key,
        value: formGroup.controls[key].value,
      }));

      const actionData: Action = {
        id: 0,
        action_type: String(
          formFields
            .filter((field) => field.name === 'action_type')
            .map((field) => field.value)[0]
        ),
        minute: Number(
          formFields
            .filter((field) => field.name === 'minute')
            .map((field) => field.value)[0]
        ),
        match_id: this.matchId,
        player_id: Number(
          formFields
            .filter((field) => field.name === 'player_id')
            .map((field) => field.value)[0]
        ),
        team_id: Number(
          formFields
            .filter((field) => field.name === 'team_id')
            .map((field) => field.value)[0]
        ),
        tournament_id: this.match?.tournament_id ?? 0,
      };

      return actionData;
    });

    try {
      await this.actionService.createActions(allActions);
      this.snackBar.open('Actions created successfully', 'Close', {
        duration: 5000,
      });
      setTimeout(() => {
        this.router.navigateByUrl('/matches-finished').then(() => {
          window.location.reload();
        });
      }, 500);
    } catch (error) {
      console.error('Błąd przy zapisywaniu działań:', error);
      this.snackBar.open('Error creating actions', 'Close', {
        duration: 5000,
      });
    }
  }

  removeForm(index: number): void {
    this.actionForms.splice(index, 1);
  }
}
