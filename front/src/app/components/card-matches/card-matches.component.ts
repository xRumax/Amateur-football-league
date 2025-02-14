import { Component, Input } from '@angular/core';
import { Match, MatchService } from '../../services/match.service';
import { TeamService } from '../../services/team.service';
import { Tournament } from '../../services/tournament.service';
import { Router } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-matches',
  templateUrl: './card-matches.component.html',
  styleUrl: './card-matches.component.scss',
})
export class CardMatchesComponent {
  @Input() matches: Match[] = [];
  @Input() tournaments: Tournament[] = [];
  teamNames: { [key: number]: string } = {};
  filteredMatches: Match[] = [];

  @Input() dataType!:
    | 'match-finished'
    | 'matches'
    | 'tournament-matches'
    | 'home';

  constructor(
    private teamService: TeamService,
    private router: Router,
    private matchService: MatchService,
    private tournamentService: TournamentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const tournamentId = this.route.snapshot.paramMap.get('id');
    this.loadTeams();
    if (this.dataType === 'match-finished') {
      this.loadMatchesFinished();
    } else if (this.dataType === 'matches') {
      this.loadMatchManager();
    } else if (this.dataType === 'tournament-matches') {
      this.loadTournamentMatches(Number(tournamentId));
    } else if (this.dataType === 'home') {
      this.loadMatchesHome();
    }
  }

  async loadTeams(): Promise<void> {
    try {
      const teams = await this.teamService.getAllTeams();
      teams.forEach((team) => {
        this.teamNames[team.id] = team.name;
      });
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  }

  async loadMatchesHome(): Promise<void> {
    try {
      const allMatches = await this.matchService.getMatchesWithResults(3);
      this.filteredMatches = allMatches.filter((match) => {
        return match.result != null || match.result != undefined;
      });
    } catch (error) {
      console.error('Error loading Matches:', error);
    }
  }

  async loadMatchesFinished(): Promise<void> {
    try {
      const allMatches = await this.matchService.getMatchesWithResults();
      this.filteredMatches = allMatches.filter((match) => {
        return match.result != null || match.result != undefined;
      });
    } catch (error) {
      console.error('Error loading Matches:', error);
    }
  }

  async loadMatchManager(): Promise<void> {
    try {
      const allMatches = await this.matchService.getMatches();
      this.matches = allMatches.filter((match) => !match.result);
    } catch (error) {
      console.error('Error loading Matches:', error);
    }
  }

  async loadTournamentMatches(tournamentId: number): Promise<void> {
    try {
      const allMatches =
        await this.tournamentService.getTournamentMatchesWithResult(
          tournamentId
        );
      this.filteredMatches = allMatches.filter(
        (match) => match.result != null && match.result.trim() !== ''
      );
      this.matches = this.filteredMatches;
    } catch (error) {
      console.error('Error loading Matches:', error);
    }
  }

  onCardClicked(matchId: any): void {
    if (this.dataType === 'matches') {
      this.router.navigate(['/match-update', matchId]);
    } else if (this.dataType === 'match-finished') {
      this.router.navigate(['/match', matchId]);
    } else if (this.dataType === 'home') {
      this.router.navigate(['/match', matchId]);
    }
  }
}
