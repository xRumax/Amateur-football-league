import { Component } from '@angular/core';
import { MatchService, Match } from '../../../services/match.service';

@Component({
  selector: 'app-match-manager',
  templateUrl: './match-manager.component.html',
  styleUrl: './match-manager.component.scss',
})
export class MatchManagerComponent {
  matches: Match[] = [];

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  async loadMatches(): Promise<void> {
    try {
      const allMatches = await this.matchService.getMatches();
      // Filtruj mecze, które nie posiadają wyniku
      this.matches = allMatches.filter((match) => !match.result);
    } catch (error) {
      console.error('Error loading Matches:', error);
    }
  }
}
