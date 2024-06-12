import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout(): void {
    this.authService.logout(); // Wywołujemy metodę logout() z serwisu autentykacji
    this.sessionService.clearSession(); // Wywołujemy metodę clearSession() z serwisu sesji
    this.router.navigate(['/login']); // Przekierowuje użytkownika na stronę /login po wylogowaniu
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
