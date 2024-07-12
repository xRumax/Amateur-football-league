import { Injectable } from '@angular/core';
import axios from 'axios';
import { Environment } from '../../environments/environment';
import { FormField } from '../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { League } from './league.service';
import { SessionService } from './session.service';
import { Request, Response } from 'express';
import { Player } from './player.service';

export interface Team {
  id: number;
  name: string;
  matches_played: number;
  players: Player[];
  statics: number;
  league_id: number;
  creator_id: number;
  creator_username?: string;
  league_name?: string;
  logo?: string;
}

export interface TeamColumns {
  key: keyof Team;
  header: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(
    private envService: Environment,
    private snackBar: MatSnackBar,
    private sessionService: SessionService
  ) {}

  generateTeamFields(leagues: League[]): FormField[] {
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
        name: 'league_name',
        id: 'league_name',
        placeholder: 'League Name',
        value: '',
      },
      {
        type: 'select',
        name: 'league_id',
        id: 'league_id',
        placeholder: 'League',
        value: '',
        options: leagues.map((league) => ({
          label: league.name,
          value: league.id,
        })),
      },
      {
        type: 'number',
        name: 'creator_id',
        id: 'creator_id',
        placeholder: 'Creator ID',
        value: '',
      },
      {
        type: 'text',
        name: 'creator_username',
        id: 'creator_username',
        placeholder: 'Creator Username',
        value: '',
      },
      {
        type: 'number',
        name: 'statics',
        id: 'statics',
        placeholder: 'Statics',
        value: '',
      },
      {
        type: 'file',
        name: 'logo',
        id: 'logo',
        placeholder: 'Logo',
        value: '',
      },
    ];
  }

  teamcolumns: TeamColumns[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'matches_played', header: 'Matches Played' },
    { key: 'league_name', header: 'League' },
  ];

  createTeam(formData: FormData): Promise<Team> {
    const token = this.sessionService.getToken();

    return axios
      .post(`${this.envService.base_url}/teams`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        this.snackBar.open('Team created successfully', 'Close', {
          duration: 5000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response && error.response.status === 400) {
          this.snackBar.open('You already have a team', 'Close', {
            duration: 5000,
          });
        } else {
          console.error('Error creating team:', error);
        }
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

  getTeam(teamId: number): Promise<Team> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.envService.base_url}/teams/${teamId}`)
        .then((response) => {
          const team: Team = response.data;
          // Checking and switching the value of matches_played to 0 if it is undefined
          team.matches_played = team.matches_played ?? 0;
          resolve(team);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async teamExists(name: string): Promise<boolean> {
    const teams = await this.getAllTeams();
    return teams.some((team) => team.name === name);
  }

  getCurrentTeam(req: Request, res: Response): void {
    const teamId = Number(req.params['id']);
    this.getTeam(teamId)
      .then((team) => {
        res.json(team);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  getLeagueNameById(leagueId: number): Promise<string> {
    return axios
      .get(`${this.envService.base_url}/leagues/${leagueId}`)
      .then((response) => response.data.name)
      .catch((error) => {
        console.error('Error fetching league name:', error);
        throw error;
      });
  }
  async getCreatorUsernameById(creatorId: number): Promise<string> {
    return axios
      .get(`${this.envService.base_url}/users/${creatorId}`)
      .then((response) => response.data.username)
      .catch((error) => {
        console.error('Error fetching creator username:', error);
        throw error;
      });
  }
}
