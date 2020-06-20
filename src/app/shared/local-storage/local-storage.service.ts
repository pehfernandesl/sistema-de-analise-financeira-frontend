import { Injectable } from '@angular/core';

export const STORAGE_KEYS = {
  USER_TOKEN: 'userToken'
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
}
