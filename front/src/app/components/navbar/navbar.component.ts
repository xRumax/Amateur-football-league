import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout(): void {
    this.authService.logout();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

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
    const userWithTournament = user as any;
    if (userWithTournament && userWithTournament.tournament) {
      return userWithTournament.tournament.id;
    }
    return null;
  }

  async navigateToMyTeam(): Promise<void> {
    const teamId = await this.getTeamIdFromUser();
    if (teamId !== null && teamId !== undefined) {
      this.router.navigate(['/team', teamId]).then(() => {
        window.location.reload();
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
        window.location.reload();
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
