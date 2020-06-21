import { TokenValidationResponse } from './../../token-validation-response';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { TokenResponse } from 'src/app/token-response';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = environment.auth.tokenValidationUrl;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {}

  public isAuthenticated(): boolean {
    const token = this.localStorageService.getTokenFromStorage();

    if (token) {
      if (this.isTokenValid(token)) {
        return true;
      }
    }

    return false;
  }

  public getActiveUserEmail(): string | null {
    return this.localStorageService.getActiveUserEmailFromStorage();
  }

  public isTokenValid(token: string): Observable<TokenValidationResponse> {
    return this.httpClient.get<TokenValidationResponse>(this.api, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
}
