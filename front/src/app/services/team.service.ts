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

  generateTeamFields(team: Team, leagues: League[]): FormField[] {
    return [
      {
        type: 'number',
        name: 'id',
        id: 'id',
        placeholder: 'ID',
        value: team.id ?? '',
      },
      {
        type: 'text',
        name: 'name',
        id: 'name',
        placeholder: 'Name',
        value: team.name ?? '',
      },
      {
        type: 'number',
        name: 'matches_played',
        id: 'matches_played',
        placeholder: 'Matches Played',
        value: team.matches_played ?? '',
      },
      {
        type: 'string',
        name: 'league_name',
        id: 'league_name',
        placeholder: 'League Name',
        value: team.league_id ?? '',
      },
      {
        type: 'select',
        name: 'league_id',
        id: 'league_id',
        placeholder: 'League',
        value: team.league_name ?? '',
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
        value: team.creator_id ?? '',
      },
      {
        type: 'text',
        name: 'creator_username',
        id: 'creator_username',
        placeholder: 'Creator Username',
        value: team.creator_username ?? '',
      },
      {
        type: 'number',
        name: 'statics',
        id: 'statics',
        placeholder: 'Statics',
        value: team.statics ?? '',
      },
      {
        type: 'file',
        name: 'logo',
        id: 'logo',
        placeholder: 'Logo',
        value: team.logo ?? '',
      },
    ];
  }

  teamColumns: TeamColumns[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'matches_played', header: 'Matches Played' },
    { key: 'league_name', header: 'League' },
  ];

  staticsColumns = [
    { key: 'goals', header: 'Goals' },
    { key: 'yellow_cards', header: 'Yellow Cards' },
    { key: 'red_cards', header: 'Red Cards' },
    { key: 'shots', header: 'Shots' },
    { key: 'shots_on_target', header: 'Shots On Target' },
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
        return response.data;
      })
      .catch((error) => {
        console.error('Error creating team:', error);
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
          team.matches_played = team.matches_played ?? 0;
          resolve(team);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  deleteTeam(teamId: number): Promise<void> {
    const token = this.sessionService.getToken();

    return axios
      .delete(`${this.envService.base_url}/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        this.snackBar.open('Team deleted successfully', 'Close', {
          duration: 5000,
        });
      })
      .catch((error) => {
        console.error('Error deleting team:', error);
        throw error;
      });
  }

  updateTeam(teamId: number, data: any): Promise<Team> {
    const token = this.sessionService.getToken();

    return axios
      .put(`${this.envService.base_url}/teams/${teamId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error updating team:', error);
        throw error;
      });
  }

  async teamExists(name: string): Promise<boolean> {
    const teams = await this.getAllTeams();
    return teams.some((team) => team.name === name);
  }

  async teamExistsById(teamId: number): Promise<boolean> {
    try {
      const response = await axios.get(
        `${this.envService.base_url}/teams/${teamId}`
      );
      return response.status === 200;
    } catch (error) {
      return false;
    }
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

  async getAllTeamsWithLeagueName(): Promise<Team[]> {
    try {
      const teams = await this.getAllTeams();
      const teamPromises = teams.map(async (team) => {
        team.league_name = await this.getLeagueNameById(team.league_id);
        return team;
      });
      return Promise.all(teamPromises);
    } catch (error) {
      console.error('Error fetching teams with league names:', error);
      throw error;
    }
  }

  async getTeamNamebyId(teamId: number): Promise<string> {
    try {
      const response = await axios.get(
        `${this.envService.base_url}/teams/${teamId}`
      );
      return response.data.name;
    } catch (error) {
      console.error(`Error fetching team name for team ID ${teamId}:`, error);
      return 'No Team';
    }
  }

  async getTeamIdByUserId(userId: number): Promise<number> {
    try {
      const response = await axios.get(
        `${this.envService.base_url}/teams/creator/${userId}`
      );
      return response.data.id;
    } catch (error) {
      console.error('Error fetching team ID by user ID:', error);
      throw error;
    }
  }
}
