import { Component } from '@angular/core';
import { Match, MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-match-base',
  templateUrl: './match-base.component.html',
  styleUrl: './match-base.component.scss',
})
export class MatchBaseComponent {
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
        return match.result != null || match.result != undefined;
      });
    } catch (error) {
      console.error('Error loading Matches:', error);
    }
  }
}
