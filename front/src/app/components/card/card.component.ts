import { Component } from '@angular/core';
import {
  Tournament,
  TournamentService,
} from '../../services/tournament.service';
import { UserService } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  tournaments: Tournament[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private tournamentService: TournamentService,
    private userService: UserService,
    private teamService: TeamService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loadTournaments();
  }

  async loadTournaments(): Promise<void> {
    try {
      this.tournaments = await this.tournamentService.getTournaments();
    } catch (error) {
      console.error('Error loading tournaments:', error);
    }
  }

  async joinToTournament(tournament: Tournament): Promise<void> {
    const userId = this.sessionService.getUserId();
    const userTeam = await this.userService.getUserTeam(Number(userId));

    await this.tournamentService.addTeamToTournament(
      userTeam.id,
      tournament.id
    );
    this.snackBar.open(`Successfully joined`, 'Close', { duration: 5000 });
    this.loadTournaments(); // Refresh the list of tournaments
  }
}
