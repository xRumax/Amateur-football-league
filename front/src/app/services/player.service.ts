import { Injectable } from '@angular/core';
import axios from 'axios';
import { Environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from './session.service';
import { FormField } from '../app.component';
import { HttpClient } from '@angular/common/http';

export interface Player {
  id: number;
  name: string;
  last_name: string;
  date_of_birth: string;
  sex: string;
  team_id: number;
  team_name?: string;
  goals?: number;
  assists?: number;
  yellow_cards?: number;
  red_cards?: number;
  offside?: number;
  shots?: number;
  shots_on_target?: number;
}

export interface PlayerColumns {
  key: keyof Player;
  header: string;
}

export interface PlayerDetailsColumns {
  key: keyof Player;
  header: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(
    private http: HttpClient,
    private envService: Environment,
    private sessionService: SessionService,
    private snackBar: MatSnackBar
  ) {}

  generatePlayerFields(player: Player): FormField[] {
    const fields: FormField[] = [
      {
        type: 'number',
        name: 'id',
        id: 'id',
        placeholder: 'ID',
        value: player.id ?? '',
      },
      {
        type: 'text',
        name: 'name',
        id: 'name',
        placeholder: 'Name',
        value: player.name ?? '',
      },
      {
        type: 'text',
        name: 'last_name',
        id: 'last_name',
        placeholder: 'Last Name',
        value: player.last_name ?? '',
      },
      {
        type: 'date',
        name: 'date_of_birth',
        id: 'date_of_birth',
        placeholder: 'Date of Birth',
        value: player.date_of_birth ?? '',
      },
      {
        type: 'select',
        name: 'sex',
        id: 'sex',
        placeholder: 'Sex',
        options: [
          { label: 'Male', value: 1 },
          { label: 'Female', value: 2 },
        ],
        value: player.sex ?? '',
      },
      {
        type: 'number',
        name: 'team_id',
        id: 'team_id',
        placeholder: 'Team ID',
        value: player.team_id ?? '',
      },
      {
        type: 'string',
        name: 'team_name',
        id: 'team_name',
        placeholder: 'Team Name',
        value: player.team_name ?? '',
      },
    ];
    return fields;
  }

  playerColumns: PlayerColumns[] = [
    { key: 'name', header: 'Name' },
    { key: 'last_name', header: 'Last Name' },
    { key: 'team_name', header: 'Team' },
  ];

  playerDetailsColumns: PlayerColumns[] = [
    { key: 'name', header: 'Name' },
    { key: 'last_name', header: 'Last Name' },
    { key: 'team_name', header: 'Team' },
  ];

  async playerExists(
    name: string,
    last_name: string,
    date_of_birth: string
  ): Promise<boolean> {
    const players = await this.getAllPlayers();
    return players.some(
      (player) =>
        player.name === name &&
        player.last_name === last_name &&
        player.date_of_birth === date_of_birth
    );
  }

  getAllPlayers(): Promise<Player[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.envService.base_url}/players`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getPlayer(playerId: number): Promise<Player> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.envService.base_url}/players/${playerId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  createPlayer(playerData: any): Promise<Player> {
    const token = this.sessionService.getToken();

    // Mapping values from int to string
    if (playerData.sex === 1) {
      playerData.sex = 'Male';
    } else if (playerData.sex === 2) {
      playerData.sex = 'Female';
    }
    return axios
      .post(
        `${this.envService.base_url}/players/`,
        JSON.stringify(playerData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        this.snackBar.open('Player added successfully', 'Close', {
          duration: 5000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
        return response.data;
      })
      .catch((error) => {
        console.error('Error creating player:', error);
        throw error;
      });
  }

  async getTeamName(teamId: number): Promise<string> {
    if (!teamId) return 'No Team';

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

  async getPlayerByTeamId(teamId: number): Promise<Player[]> {
    const players = await this.getAllPlayers();
    return players.filter((player) => player.team_id === teamId);
  }
}
