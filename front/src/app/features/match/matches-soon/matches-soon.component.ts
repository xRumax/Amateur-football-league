import { Component } from '@angular/core';
import { Match, MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-matches-soon',
  templateUrl: './matches-soon.component.html',
  styleUrl: './matches-soon.component.scss',
})
export class MatchesSoonComponent {
  matches: Match[] = [];
  filteredMatches: Match[] = [];

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  async loadMatches(): Promise<void> {
    try {
      const allMatches = await this.matchService.getMatches();
      this.filteredMatches = allMatches.filter((match) => {
        return match.result === null || match.result === undefined;
      });
    } catch (error) {
      console.error('Error loading Matches:', error);
    }
  }
}
