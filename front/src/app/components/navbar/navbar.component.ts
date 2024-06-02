import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  currentUrl: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  logout(): void {
    this.authService.logout(); // Wywołujemy metodę logout() z serwisu autentykacji
    this.router.navigate(['/login']); // Przekierowuje użytkownika na stronę /login po wylogowaniu
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
