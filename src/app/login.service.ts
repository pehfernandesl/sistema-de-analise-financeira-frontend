import { LocalStorageService } from './shared/local-storage/local-storage.service';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenResponse } from './token-response';
import { Credencial } from './credencial';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public login(credencial: Credencial): Observable<TokenResponse> {
    return this.http.post(environment.auth.loginUrl, credencial);
  }

  public logout(): void {
    this.localStorageService.clearUser();
    this.router.navigate(['login']);
  }
}
