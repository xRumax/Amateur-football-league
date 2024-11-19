import { Injectable } from '@angular/core';
import axios from 'axios';
import { Environment } from '../../environments/environment';
import { Team } from './team.service';
import { FormField } from '../app.component';

export interface Match {
  id: number;
  date_of_match: string;
  result: string;
  team_1: Team;
  team_2: Team;
}
@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private envService: Environment) {}

  generateMatchFields(match: Match): FormField[] {
    const fields: FormField[] = [
      {
        type: 'string',
        name: 'result',
        id: 'result',
        placeholder: 'Result',
        value: match.result ?? '',
      },
    ];
    return fields;
  }

  getMatches(): Promise<Match[]> {
    return axios
      .get(`${this.envService.base_url}/matches`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching matches:', error);
        throw error;
      });
  }

  getMatchById(matchId: number): Promise<Match> {
    return axios
      .get(`${this.envService.base_url}/matches/${matchId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching match by ID:', error);
        throw error;
      });
  }

  async getTeamsByMatchId(matchId: number): Promise<Team[]> {
    return axios
      .get(`${this.envService.base_url}/matches/${matchId}/teams`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching teams by match ID:', error);
        throw error;
      });
  }

  updateMatchById(matchId: number, match: Match): Promise<Match> {
    return axios
      .put(`${this.envService.base_url}/matches/${matchId}`, match)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error updating match:', error);
        throw error;
      });
  }
}
