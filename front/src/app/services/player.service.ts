import { Injectable } from '@angular/core';

export interface Player {
  id: number;
  name: string;
  last_name: string;
  date_of_birth: string;
  sex: string;
  team_id: number;
  num_of_goals?: number;
  num_of_assists?: number;
  num_of_yellow_cards?: number;
  num_of_red_cards?: number;
  num_of_matches_played?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor() {}
}
