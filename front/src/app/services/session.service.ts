import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly TOKEN_KEY = 'access_token';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token;
  }
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  getUserId(): string | null {
    const access_token = this.getToken();

    if (access_token) {
      try {
        const decodedToken = helper.decodeToken(access_token);
        return decodedToken.user_id;
      } catch (error) {
        console.error('Token decoding error:', error); // Obsłuż błędy dekodowania tokenu
        return null;
      }
    }
    return null;
  }

  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
