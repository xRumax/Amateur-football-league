import { Injectable } from '@angular/core';
import { FormField } from '../app.component';
import { Player } from './player.service';
import { Team } from './team.service';
import { Environment } from '../../environments/environment';
import axios from 'axios';

export interface MatchAction {
  id: number;
  action_type: string;
  count: number;
  minute: number;
  match_id: number;
  player_id: number;
  player_name?: string;
  team_id: number;
  team_name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  constructor(private envService: Environment) {}

  generateActionFields(
    action: MatchAction,
    players: Player[],
    teams: Team[]
  ): FormField[] {
    return [
      {
        type: 'select',
        name: 'action_type',
        id: 'action_type',
        placeholder: 'Action Type',
        options: [
          { label: 'Goal', value: 1 },
          { label: 'Assist', value: 2 },
          { label: 'Yellow Card', value: 3 },
          { label: 'Red Card', value: 4 },
          { label: 'Substitution', value: 5 },
          { label: 'Offside', value: 6 },
          { label: 'Corner', value: 7 },
          { label: 'Free Kick', value: 8 },
          { label: 'Penalty', value: 9 },
          { label: 'Shot', value: 10 },
          { label: 'Shot on target', value: 11 },
          { label: 'Foul', value: 12 },
        ],
        value: action.action_type ?? '',
      },
      {
        type: 'number',
        name: 'count',
        id: 'count',
        placeholder: 'Count',
        value: action.count ?? 0,
      },
      {
        type: 'number',
        name: 'minute',
        id: 'minute',
        placeholder: 'Minute',
        value: action.minute ?? 0,
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
        name: 'team_id',
        id: 'team_id',
        placeholder: 'Team ID',
        value: action.team_id ?? 0,
        options: teams.map((team) => ({
          label: team.name,
          value: team.id,
        })),
      },
    ];
  }

  createAction(action: MatchAction): Promise<MatchAction> {
    return axios
      .post(`${this.envService.base_url}/actions`, action)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error creating action:', error);
        throw error;
      });
  }
}
