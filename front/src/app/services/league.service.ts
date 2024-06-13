import { Injectable } from '@angular/core';
import axios from 'axios';
import { Environment } from '../../environments/environment';

export interface League {
  id: number;
  name: string;
  description: string;
  rules: string;
  teams: number[];
}

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  constructor(private envService: Environment) {}

  getLeagueName(leagueId: number): Promise<string> {
    return axios
      .get(`${this.envService.base_url}/leagues/${leagueId}`)
      .then((response) => response.data.name)
      .catch((error) => {
        console.error('Error fetching league name:', error);
        throw error;
      });
  }

  getLeagues(): Promise<League[]> {
    return axios
      .get(`${this.envService.base_url}/leagues`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching leagues:', error);
        throw error;
      });
  }
}
