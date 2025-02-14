import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private navigationService: NavigationService
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

  get isReferee(): boolean {
    return this.authService.isReferee();
  }

  async navigateToMyTeam(): Promise<void> {
    await this.navigationService.navigateToMyTeam();
  }

  async navigateToMyTournament(): Promise<void> {
    await this.navigationService.navigateToMyTournament();
  }

  async navigateToCreatePlayer(): Promise<void> {
    await this.navigationService.navigateToCreatePlayer();
  }
}
