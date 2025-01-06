import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserLoggedIn: boolean = false;

  constructor(
    private envService: Environment,
    private sessionService: SessionService,
    private router: Router,
    private userService: UserService
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
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('access_token', response.data.access_token);
            const decodedToken: any = jwtDecode(response.data.access_token);
            const userId = decodedToken.user_id;

            this.userService
              .getUser(userId)
              .then((userResponse) => {
                const isReferee = userResponse.is_referee;
                localStorage.setItem(
                  'is_referee',
                  isReferee ? 'true' : 'false'
                );
                observer.next(response.data);
                observer.complete();
              })
              .catch((error) => {
                observer.error('Error fetching user data');
              });
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

  isReferee(): boolean {
    const isReferee = localStorage.getItem('is_referee');
    return isReferee === 'true';
  }

  register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const user = { username, email, password, confirmPassword };
    return axios.post(this.envService.registerUrl, user);
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    this.sessionService.clearSession();
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_referee');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
