import { Injectable } from '@angular/core';
import { FormField } from '../app.component';
import { Player } from './player.service';
import { Team } from './team.service';
import { Environment } from '../../environments/environment';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface MatchAction {
  id: number;
  action_type: string;
  minute: number;
  match_id: number;
  player_id: number;
  player_name?: string;
  team_id: number;
  team_name?: string;
}

export interface ActionColumns {
  key: keyof Player;
  header: string;
}

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  constructor(private envService: Environment, private snackBar: MatSnackBar) {}

  generateActionFields(
    action: MatchAction,
    players: Player[],
    teams: Team[]
  ): FormField[] {
    return [
      {
        type: 'select',
        name: 'team_id',
        id: 'team_id',
        placeholder: 'Team ID',
        value: action.team_id ?? 0,
        options: teams.map((team) => ({
          label: team.name,
          value: team.id,
        })),
      },
      {
        type: 'select',
        name: 'player_id',
        id: 'player_id',
        placeholder: 'Player ID',
        value: action.player_id ?? '',
        options: players.map((player) => ({
          label: `${player.name} ${player.last_name}`,
          value: player.id,
        })),
      },
      {
        type: 'select',
        name: 'action_type',
        id: 'action_type',
        placeholder: 'Action Type',
        options: [
          { label: 'Goal', value: 'Goal' },
          { label: 'Assist', value: 'Assist' },
          { label: 'Yellow Card', value: 'Yellow Card' },
          { label: 'Red Card', value: 'Red Card' },
          { label: 'Substitution', value: 'Substitution' },
          { label: 'Offside', value: 'Offside' },
          { label: 'Corner', value: 'Corner' },
          { label: 'Free Kick', value: 'Free Kick' },
          { label: 'Penalty', value: 'Penalty' },
          { label: 'Shot', value: 'Shot' },
          { label: 'Shot On Target', value: 'Shot On Target' },
          { label: 'Foul', value: 'Foul' },
        ],
        value: action.action_type ?? '',
      },
      {
        type: 'number',
        name: 'minute',
        id: 'minute',
        placeholder: 'Minute',
        value: action.minute ?? 0,
      },
    ];
  }

  playerStaticsColumns: ActionColumns[] = [
    { key: 'goals', header: 'Goals' },
    { key: 'assists', header: 'Assists' },
    { key: 'yellow_cards', header: 'Yellow Cards' },
    { key: 'red_cards', header: 'Red Cards' },
    { key: 'offside', header: 'Offside' },
    { key: 'shots', header: 'Shots' },
    { key: 'shots_on_target', header: 'Shots on Target' },
  ];

  createAction(action: MatchAction): Promise<MatchAction> {
    return axios
      .post(`${this.envService.base_url}/actions`, action)
      .then((response) => {
        this.snackBar.open('Action created successfully', 'Close', {
          duration: 5000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
        return response.data;
      })
      .catch((error) => {
        console.error('Error creating action:', error);
        throw error;
      });
  }

  createActions(actions: MatchAction[]): Promise<void> {
    return axios
      .post(`${this.envService.base_url}/actions/bulk`, actions)
      .then(() => {
        this.snackBar.open('All actions created successfully', 'Close', {
          duration: 5000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error('Error creating actions:', error);
        throw error;
      });
  }

  getPlayerActions(playerId: number): Promise<Player[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.envService.base_url}/actions/${playerId}/actions`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
