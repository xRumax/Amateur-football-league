import { Component, Input, OnInit } from '@angular/core';
import { MatchService, Match } from '../../../services/match.service';
import { ActionService, MatchAction } from '../../../services/action.service';
import { ActivatedRoute } from '@angular/router';
import { Player, PlayerService } from '../../../services/player.service';
import { Team, TeamService } from '../../../services/team.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
  currentView: 'actions' | 'result' = 'actions';

  constructor(
    private matchService: MatchService,
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
    const action: MatchAction = {
      id: 0,
      action_type: '',
      minute: 0,
      match_id: this.matchId,
      player_id: 0,
      team_id: 0,
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

  submitAllForms(): void {
    const allActions = this.actionForms.map((formGroup) => {
      const formFields = Object.keys(formGroup.controls).map((key) => ({
        name: key,
        value: formGroup.controls[key].value,
      }));

      const actionData: MatchAction = {
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
      };

      return actionData;
    });

    if (allActions.length > 0) {
      this.actionService
        .createActions(allActions)
        .then(() => {})
        .catch((error) =>
          console.error('Błąd przy zapisywaniu działań:', error)
        );
    } else {
      console.error('Brak poprawnych danych do wysłania!');
    }

    setTimeout(() => {
      this.router.navigateByUrl('/matches-finished').then(() => {
        window.location.reload();
      });
    }, 500);
  }

  removeForm(index: number): void {
    this.actionForms.splice(index, 1);
  }
}
