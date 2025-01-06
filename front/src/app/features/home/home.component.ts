import { Component } from '@angular/core';
import { Match, MatchService } from '../../services/match.service';
import {
  Tournament,
  TournamentService,
} from '../../services/tournament.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  matches: Match[] = [];
  filteredMatches: Match[] = [];
  tournaments: Tournament[] = [];

  constructor(
    private authService: AuthService,
    private matchService: MatchService,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    this.loadMatches();
    this.loadTournaments();
    this.addScrollEvent();
    this.checkSectionVisibility();
    this.makeHeroVisible();
  }

  async loadMatches(): Promise<void> {
    try {
      const allMatches = await this.matchService.getMatches(3);
      this.filteredMatches = allMatches
        .filter((match) => match.result && match.result.trim() !== '')
        .sort(
          (a, b) =>
            new Date(b.date_of_match).getTime() -
            new Date(a.date_of_match).getTime()
        );
    } catch (error) {
      console.error('Error loading Matches:', error);
    }
  }

  async loadTournaments(): Promise<void> {
    try {
      const allTournaments = await this.tournamentService.getTournaments();
      this.tournaments = allTournaments.filter(
        (tournament) => tournament.is_active === true
      );
    } catch (error) {
      console.error('Error loading tournaments:', error);
    }
  }

  async loadData(): Promise<void> {
    try {
      const [matches, tournaments] = await Promise.all([
        this.matchService.getMatches(3),
        this.tournamentService.getTournaments(3),
      ]);

      this.filteredMatches = matches;
      this.tournaments = tournaments;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  addScrollEvent(): void {
    window.addEventListener('scroll', this.checkSectionVisibility);
  }

  checkSectionVisibility(): void {
    const sections = document.querySelectorAll(
      '.hero, .features, .news, .footer'
    ) as NodeListOf<HTMLElement>;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  }

  makeHeroVisible(): void {
    const heroSection = document.querySelector('.hero') as HTMLElement;
    if (heroSection) {
      heroSection.classList.add('visible');
    }
  }

  get isNotLoggedIn(): boolean {
    return this.authService.isLoggedIn() === false;
  }
}
