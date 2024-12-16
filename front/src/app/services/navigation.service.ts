import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  async getTeamIdFromUser(): Promise<number | null> {
    const { user } = await this.userService.getUserDataAndFields();
    const userWithTeam = user as any;
    if (userWithTeam && userWithTeam.team) {
      return userWithTeam.team.id;
    }
    return null;
  }

  async getTournamentIdFromUser(): Promise<number | null> {
    const { user } = await this.userService.getUserDataAndFields();
    const tournaments = user.tournaments;
    if (
      tournaments &&
      tournaments.some((tournament) => tournament.is_active === true)
    ) {
      const activeTournament = tournaments.find(
        (tournament) => tournament.is_active === true
      );
      return activeTournament.id;
    }
    return null;
  }

  async navigateToMyTeam(): Promise<void> {
    const teamId = await this.getTeamIdFromUser();
    if (teamId !== null && teamId !== undefined) {
      this.router.navigate(['/team', teamId]).then(() => {
        window.location.reload();
        this.router.navigate([this.router.url]);
      });
    } else {
      console.error('No team ID found for the user, cannot navigate');
      this.showSnackbar("You already don't have any team");
    }
  }

  async navigateToMyTournament(): Promise<void> {
    const tournamentId = await this.getTournamentIdFromUser();
    if (tournamentId !== null && tournamentId !== undefined) {
      this.router.navigate(['/tournament', tournamentId]).then(() => {
        window.location.reload();
        this.router.navigate([this.router.url]);
      });
    } else {
      console.error('No tournament ID found for the user, cannot navigate');
      this.showSnackbar("You already don't have any tournament");
    }
  }

  async navigateToCreatePlayer(): Promise<void> {
    const teamId = await this.getTeamIdFromUser();
    if (teamId !== null && teamId !== undefined) {
      this.router.navigate(['/player-create']).then(() => {
        this.router.navigate([this.router.url]);
      });
    } else {
      console.error('No team ID found for the user, cannot navigate');
      this.showSnackbar("You already don't have any team");
    }
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
