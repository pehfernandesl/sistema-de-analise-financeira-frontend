import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { AuthService } from './shared/auth/auth.service';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      console.log('TEM TOKEN, NÃO FAZ NADA');
      return true;
    }

    console.log('SEM TOKEN, VAI PRO LOGIN');
    this.router.navigate(['login']);
    return false;
  }
}
