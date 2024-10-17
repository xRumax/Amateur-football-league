import { Injectable } from '@angular/core';
import axios from 'axios';
import { Environment } from '../../environments/environment';

export interface Match {
  id: number;
  date: Date;
  result: string;
  team_1_id: number;
  team_2_id: number;
}
@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private envService: Environment) {}

  getMatches(): Promise<Match[]> {
    return axios
      .get(`${this.envService.base_url}/matches`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching matches:', error);
        throw error;
      });
  }
}
