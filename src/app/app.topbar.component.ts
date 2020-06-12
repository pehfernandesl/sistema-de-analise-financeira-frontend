import { AppComponent } from './app.component';
import { Authentication } from '../lib/base/security/authentication/authentication';
import { Component } from '@angular/core';
import { User } from '../lib/base/security/authentication/user';

@Component({
  selector: 'safi-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent {
  constructor(
    public app: AppComponent,
    private _authentication: Authentication<User>
  ) {}

  get usuario() {
    return this._authentication.getUser();
  }
}
