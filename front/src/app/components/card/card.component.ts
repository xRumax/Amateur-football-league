import { Component, Input, OnInit } from '@angular/core';
import {
  Tournament,
  TournamentService,
} from '../../services/tournament.service';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  tournaments: Tournament[] = [];
  userTeam: any = {};
  @Input() tournament: any;
  @Input() dataType!: 'tournament' | 'match' | 'home';
  teams: any[] = [];
  userTeamId: number | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private tournamentService: TournamentService,
    private userService: UserService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadTournaments();

    const userId = this.sessionService.getUserId();
    if (userId) {
      const userTeam = await this.userService.getUserTeam(Number(userId));
      this.userTeamId = userTeam.id;
    }
  }

  async loadTournaments(): Promise<void> {
    try {
      this.tournaments = await this.tournamentService.getTournaments();
    } catch (error) {
      console.error('Error loading tournaments:', error);
    }
  }

  isTeamInTournament(tournament: Tournament): boolean {
    const isInTournament = tournament.teams.some(
      (team: any) => team.id === this.userTeamId
    );

    return isInTournament;
  }

  async joinToTournament(tournament: Tournament): Promise<void> {
    try {
      const userId = this.sessionService.getUserId();
      console.log('User ID:', userId);

      const userHasTeam = await this.userService.userHasTeam(Number(userId));
      console.log('User has team:', userHasTeam);

      if (!userHasTeam) {
        this.snackBar.open("You already don't have a team", 'Close', {
          duration: 5000,
        });
        return;
      }

      const userTeam = await this.userService.getUserTeam(Number(userId));
      console.log('User team:', userTeam);

      if (this.isTeamInTournament(tournament)) {
        this.snackBar.open('Your team is already in this tournament', 'Close', {
          duration: 5000,
        });
        return;
      }

      console.log('Adding team to tournament:', {
        teamId: userTeam.id,
        tournamentId: tournament.id,
      });

      await this.tournamentService.addTeamToTournament(
        userTeam.id,
        tournament.id
      );
      this.snackBar.open(`Successfully joined`, 'Close', { duration: 5000 });
      setTimeout(() => {
        this.router.navigate(['/tournament', tournament.id]);
      }, 500);
      this.loadTournaments();
    } catch (error) {
      console.error('Error joining tournament:', error);
      this.snackBar.open('Error joining tournament', 'Close', {
        duration: 5000,
      });
    }
  }

  onCardClicked(tournamentId: any): void {
    if (this.dataType === 'tournament' || this.dataType === 'home') {
      this.router.navigate(['/tournament', tournamentId]);
    }
  }
}
