import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private localStorageService: LocalStorageService) {}

  public isAuthenticated(): boolean {
    const token = this.localStorageService.getTokenFromStorage();

    if (token) {
      //Validar Token
      return true;
    }
    return false;
  }
}
