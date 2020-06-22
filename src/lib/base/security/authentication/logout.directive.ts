import { Directive, HostListener } from '@angular/core';
import { Authentication } from './authentication';
import { User } from './user';

@Directive({ selector: '[logout]' })
export class LogoutDirective {
  constructor(private authenticationService: Authentication<User>) {}

  @HostListener('click')
  click(): void {
    this.authenticationService.logout();
  }
}
