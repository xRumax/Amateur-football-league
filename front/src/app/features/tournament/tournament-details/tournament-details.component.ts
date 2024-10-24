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
  tournament: Tournament | null = null;
  matches: Match[] = [];
  tournamentId: number = 0;
  fields: FormField[] = [];
  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    const tournamentId = this.route.snapshot.paramMap.get('id');
    if (tournamentId) {
      this.loadTournamentDetails(Number(tournamentId));
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

  loadTournamentMatches(tournamentId: number): void {
    this.tournamentService
      .getMatchesByTournamentId(tournamentId)
      .then((matches) => {
        this.matches = matches;
      })
      .catch((error) => {
        console.error('Error loading tournament matches:', error);
      });
  }
}
