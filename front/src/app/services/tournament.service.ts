import { Injectable } from '@angular/core';
import { Environment } from '../../environments/environment';
import axios from 'axios';
import { FormField } from '../app.component';
import { SessionService } from './session.service';
import { Team } from './team.service';

export interface Tournament {
  id: number;
  name: string;
  amount_of_teams: number;
  teams: Team[];
  date_of_tournament: string;
}

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  constructor(
    private envService: Environment,
    private sessionService: SessionService
  ) {}

  generateTournamentFields(tournament: Tournament): FormField[] {
    return [
      {
        type: 'text',
        name: 'name',
        id: 'name',
        placeholder: 'Name',
        value: tournament.name ?? '',
      },
      {
        type: 'select',
        name: 'amount_of_teams',
        id: 'amount_of_teams',
        placeholder: 'Amount of Teams',
        options: [
          { label: '4', value: 4 },
          { label: '8', value: 8 },
          { label: '10', value: 10 },
          { label: '16', value: 16 },
        ],
        value: tournament.amount_of_teams ?? '',
      },
      {
        type: 'date',
        name: 'date_of_tournament',
        id: 'date_of_tournament',
        placeholder: 'Date',
        value: tournament.date_of_tournament ?? '',
      },
    ];
  }

  getTournaments(): Promise<Tournament[]> {
    return axios
      .get(`${this.envService.base_url}/tournaments`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching tournaments:', error);
        throw error;
      });
  }

  getTournamentById(tournamentId: number): Promise<Tournament> {
    return axios
      .get(`${this.envService.base_url}/tournaments/${tournamentId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching league:', error);
        throw error;
      });
  }
  createTournament(data: {
    name: string;
    amount_of_teams: number;
  }): Promise<Tournament> {
    const token = this.sessionService.getToken();

    return axios
      .post(`${this.envService.base_url}/tournaments`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
        return response.data;
      })
      .catch((error) => {
        console.error('Error creating tournament:', error.response.data);
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          console.error('Error details:', error.response.data.detail);
        }
        throw error;
      });
  }

  async tournamentExists(name: string): Promise<boolean> {
    const tournaments = await this.getTournaments();
    return tournaments.some((tournament) => tournament.name === name);
  }

  async updateTournament(tournamentId: number, data: any): Promise<void> {
    const token = this.sessionService.getToken();

    try {
      await axios.put(
        `${this.envService.base_url}/tournaments/${tournamentId}/`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error('Error updating tournament:', error);
      throw error;
    }
  }

  async addTeamToTournament(
    teamId: number,
    tournamentId: number
  ): Promise<void> {
    const token = this.sessionService.getToken();
    try {
      await axios.post(
        `${this.envService.base_url}/tournaments/${tournamentId}/teams/${teamId}`,
        { team_id: teamId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error('Error adding team to tournament:', error);
      throw error;
    }
  }
}
