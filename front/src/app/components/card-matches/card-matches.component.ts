import { Component, input, Input } from '@angular/core';
import { Match, MatchService } from '../../services/match.service';
import { TeamService } from '../../services/team.service';
import {
  Tournament,
  TournamentService,
} from '../../services/tournament.service';

@Component({
  selector: 'app-card-matches',
  templateUrl: './card-matches.component.html',
  styleUrl: './card-matches.component.scss',
})
export class CardMatchesComponent {
  @Input() matches: Match[] = [];
  @Input() tournaments: Tournament[] = [];
  teamNames: { [key: number]: string } = {};
  @Input() formType!:
    | 'match-soon'
    | 'match-finished'
    | 'matches'
    | 'tournament-matches';

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  async loadTeams(): Promise<void> {
    try {
      const teams = await this.teamService.getAllTeams(); // Fetch all teams
      teams.forEach((team) => {
        this.teamNames[team.id] = team.name; // Store team names by ID
      });
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  }

  getTeamName(teamId: number): string {
    return this.teamNames[teamId] || 'Unknown'; // Return the team name or 'Unknown' if not found
  }
}
