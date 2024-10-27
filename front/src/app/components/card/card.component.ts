import { Component, Input } from '@angular/core';
import {
  Tournament,
  TournamentService,
} from '../../services/tournament.service';
import { UserService } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  tournaments: Tournament[] = [];
  userTeam: any = {};
  @Input() dataType!: 'tournament' | 'match';

  constructor(
    private snackBar: MatSnackBar,
    private tournamentService: TournamentService,
    private userService: UserService,
    private router: Router,
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
    try {
      const userId = this.sessionService.getUserId();
      const userHasTeam = await this.userService.userHasTeam(Number(userId));
      if (!userHasTeam) {
        this.snackBar.open("You already don't have a team", 'Close', {
          duration: 5000,
        });
        return;
      }
      const userTeam = await this.userService.getUserTeam(Number(userId));

      await this.tournamentService.addTeamToTournament(
        userTeam.id,
        tournament.id
      );
      this.snackBar.open(`Successfully joined`, 'Close', { duration: 5000 });
      this.loadTournaments();
    } catch (error) {
      console.error('Error joining tournament:', error);
      this.snackBar.open('Error joining tournament', 'Close', {
        duration: 5000,
      });
    }
  }

  onCardClicked(tournamentId: any): void {
    if (this.dataType === 'tournament') {
      this.router.navigate(['/tournament', tournamentId]);
    }
  }
}
