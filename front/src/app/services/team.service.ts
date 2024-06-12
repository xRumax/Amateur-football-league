import { Injectable } from '@angular/core';
import axios from 'axios';
import { Environment } from '../../environments/environment';
import { FormField } from '../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface Team {
  id: number;
  name: string;
  matches_played: number;
  league_id: number;
  creator_id: number;
}

export interface TeamColumns {
  key: keyof Team;
  header: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private envService: Environment, private snackBar: MatSnackBar) {}

  generateTeamFields(): FormField[] {
    return [
      {
        type: 'number',
        name: 'id',
        id: 'id',
        placeholder: 'ID',
        value: '',
      },
      {
        type: 'text',
        name: 'name',
        id: 'name',
        placeholder: 'Name',
        value: '',
      },
      {
        type: 'number',
        name: 'matches_played',
        id: 'matches_played',
        placeholder: 'Matches Played',
        value: '',
      },
      {
        type: 'number',
        name: 'league_id',
        id: 'league_id',
        placeholder: 'League ID',
        value: '',
      },
      {
        type: 'number',
        name: 'creator_id',
        id: 'creator_id',
        placeholder: 'Creator ID',
        value: '',
      },
    ];
  }

  teamcolumns: TeamColumns[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'matches_played', header: 'Matches Played' },
    { key: 'league_id', header: 'League ID' },
    { key: 'creator_id', header: 'Creator ID' },
  ];

  createTeam(team: Team): Promise<Team> {
    const token = localStorage.getItem('access_token');

    return axios
      .post(`${this.envService.base_url}/teams`, team, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.snackBar.open('Team create successfully', 'Close', {
          duration: 5000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
        return response.data;
      })
      .catch((error) => {
        console.error('Error creating team:', error);
        throw error;
      });
  }

  getAllTeams(): Promise<Team[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.envService.base_url}/teams`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}