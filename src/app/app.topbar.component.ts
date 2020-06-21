import { LoginService } from './login.service';
import { AuthService } from './shared/auth/auth.service';
import { Component } from '@angular/core';
import { Authentication } from '../lib/base/security/authentication/authentication';
import { User } from '../lib/base/security/authentication/user';
import { AppComponent } from './app.component';

@Component({
  selector: 'safi-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {
  constructor(
    public app: AppComponent,
    private authentication: Authentication<User>,
    public authService: AuthService,
    public loginService: LoginService
  ) {}

  get usuario() {
    return this.authService.getActiveUserEmail();
  }

  getActiveUserEmail() {
    return this.authService.getActiveUserEmail();
  }
}
