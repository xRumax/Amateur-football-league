import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly USER_ID_KEY = 'userId';

  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
  }

  setUserId(user_id: string): void {
    localStorage.setItem(this.USER_ID_KEY, user_id);
  }

  clearSession(): void {
    localStorage.removeItem(this.USER_ID_KEY);
  }
}
