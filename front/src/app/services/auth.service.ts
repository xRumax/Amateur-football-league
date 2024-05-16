import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserLoggedIn: boolean = false;

  constructor() {}

  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      axios
        .post('http://127.0.0.1:8000/users/login', {
          email,
          password,
        })
        .then((response) => {
          if (response.data.access_token) {
            this.isUserLoggedIn = true;
            sessionStorage.setItem('access_token', response.data.access_token); // Save the JWT to sessionStorage
            axios
              .get('http://127.0.0.1:8000/users/me', {
                headers: {
                  Authorization: `Bearer ${response.data.access_token}`,
                },
              })
              .then((userResponse) => {
                const userId = userResponse.data.user_id; // Replace 'user_id' with the actual key in the response
                console.log(userId); // Log user id to console
                console.log(sessionStorage); // Log access token to console
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
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  logout(): void {
    this.isUserLoggedIn = false;
    sessionStorage.clear();
  }
}
