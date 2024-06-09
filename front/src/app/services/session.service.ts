import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken.user_id;
    }
    return null;
  }

  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
