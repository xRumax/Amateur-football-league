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
  }
}
