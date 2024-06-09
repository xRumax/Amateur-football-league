import { Injectable } from '@angular/core';
import axios from 'axios';
import { Environment } from '../../environments/environment';

export interface Team {
  id: number;
  name: string;
  matches_played: number;
  league_id: number;
  creator_id: number;
}

//export const fields_team: FormField[] = [];

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private envService: Environment) {}

  getAllTeams(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.envService.base_url}teams/`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
