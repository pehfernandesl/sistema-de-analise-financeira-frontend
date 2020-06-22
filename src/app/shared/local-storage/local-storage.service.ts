import { Injectable } from '@angular/core';

export const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  ACTIVE_USER_EMAIL: 'userEmail'
};

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  public storeToken(token: string): void {
    localStorage[STORAGE_KEYS.USER_TOKEN] = JSON.stringify({ token });
  }

  public getTokenFromStorage(): string | null {
    if (localStorage[STORAGE_KEYS.USER_TOKEN]) {
      return JSON.parse(localStorage[STORAGE_KEYS.USER_TOKEN])?.token;
    }

    return null;
  }

  public getActiveUserEmailFromStorage(): string | null {
    if (localStorage[STORAGE_KEYS.ACTIVE_USER_EMAIL]) {
      return JSON.parse(localStorage[STORAGE_KEYS.ACTIVE_USER_EMAIL])?.email;
    }

    return null;
  }

  public storeActiveUserEmail(email: string): void {
    localStorage[STORAGE_KEYS.ACTIVE_USER_EMAIL] = JSON.stringify({ email });
  }

  public clearUser(): void {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_EMAIL);
    localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
  }
}
