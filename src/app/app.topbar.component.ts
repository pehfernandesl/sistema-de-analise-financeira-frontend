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
    private authentication: Authentication<User>
  ) {}

  get usuario() {
    return this.authentication.getUser();
  }
}
