import { Injectable } from '@angular/core';
import { Environment } from '../../environments/environment';
import axios from 'axios';

export interface TournamentTableColumns {
  key: keyof TournamentTable;
  header: string;
}

export interface TournamentTable {
  id: number;
  tournament_id: number;
  team_id: number;
  team_name: string;
  points: number;
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
}

@Injectable({
  providedIn: 'root',
})
export class TournamentTableService {
  constructor(private envService: Environment) {}

  tournamentTableColumns: TournamentTableColumns[] = [
    { key: 'team_name', header: '' },
    { key: 'points', header: 'Points' },
    { key: 'matches_played', header: 'Matches played' },
    { key: 'wins', header: 'Wins' },
    { key: 'draws', header: 'Draws' },
    { key: 'losses', header: 'Losses' },
  ];

  getTournamentTable(tournamentId: number): Promise<TournamentTable[]> {
    return axios
      .get(`${this.envService.base_url}/tournament_table/${tournamentId}/table`)
      .then((response) => response.data);
  }
}
