import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Tournament,
  TournamentService,
} from '../../../services/tournament.service';
import { FormField } from '../../../app.component';
import { Match } from '../../../services/match.service';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.scss',
})
export class TournamentDetailsComponent {
  teams: any = [];
  tournament: Tournament | null = null;
  matches: Match[] = [];
  tournamentId: number = 0;
  fields: FormField[] = [];
  currentView: 'teams' | 'match-ladder' = 'teams';

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    const tournamentId = this.route.snapshot.paramMap.get('id');
    if (tournamentId) {
      this.loadTournamentDetails(Number(tournamentId));
      this.loadTournamentMatches(Number(tournamentId));
      this.loadTournamentTeams(Number(tournamentId));
    }
  }

  loadTournamentDetails(id: number): void {
    this.tournamentService
      .getTournamentById(id)
      .then((tournament) => {
        this.tournament = tournament;
      })
      .catch((error) => {
        console.error('Error loading tournament details:', error);
      });
  }

  async loadTournamentMatches(tournamentId: Number): Promise<void> {
    try {
      const tournamentMatches =
        await this.tournamentService.getMatchesByTournamentId(
          Number(tournamentId)
        );
      this.matches = tournamentMatches;
    } catch (error) {
      console.error('Error loading Matches:', error);
    }
  }

  switchView(view: 'teams' | 'match-ladder'): void {
    this.currentView = view;
  }

  async loadTournamentTeams(tournamentId: number): Promise<void> {
    try {
      const tournament = await this.tournamentService.getTournamentById(
        tournamentId
      );
      this.teams = tournament.teams;
    } catch (error) {
      console.error('Error loading Teams:', error);
    }
  }
}
