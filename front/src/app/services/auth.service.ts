import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserLoggedIn: boolean = false;

  constructor(
    private envService: Environment,
    private sessionService: SessionService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      axios
        .post(`${this.envService.base_url}/users/login`, {
          email,
          password,
        })
        .then((response) => {
          if (response.data.access_token) {
            this.isUserLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true'); // Set the login state
            localStorage.setItem('access_token', response.data.access_token); // Save the JWT to localStorage

            axios
              .get(`${this.envService.base_url}/users/me`, {
                headers: {
                  Authorization: `Bearer ${response.data.access_token}`,
                },
              })
              .then((userResponse) => {
                const userId = userResponse.data.user_id; // Replace 'user_id' with the actual key in the response
              });
            observer.next(response.data);
            observer.complete();
          } else {
            observer.error('Invalid email or password');
          }
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  setIsUserLoggedIn(value: boolean): void {
    this.isUserLoggedIn = value;
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  }

  isLoggedIn(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isUserLoggedIn = isLoggedIn ? isLoggedIn === 'true' : false;
    return this.isUserLoggedIn;
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }
}
