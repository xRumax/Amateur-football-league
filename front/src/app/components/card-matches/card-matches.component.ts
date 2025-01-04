import { Component, Input } from '@angular/core';
import { Match } from '../../services/match.service';
import { TeamService } from '../../services/team.service';
import { Tournament } from '../../services/tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-matches',
  templateUrl: './card-matches.component.html',
  styleUrl: './card-matches.component.scss',
})
export class CardMatchesComponent {
  @Input() matches: Match[] = [];
  @Input() tournaments: Tournament[] = [];
  teamNames: { [key: number]: string } = {};

  @Input() dataType!: 'match-finished' | 'matches' | 'tournament-matches';

  constructor(private teamService: TeamService, private router: Router) {}

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

  onCardClicked(matchId: any): void {
    if (this.dataType === 'matches') {
      this.router.navigate(['/match-update', matchId]);
    } else if (this.dataType === 'match-finished') {
      this.router.navigate(['/match', matchId]);
    }
  }
}
