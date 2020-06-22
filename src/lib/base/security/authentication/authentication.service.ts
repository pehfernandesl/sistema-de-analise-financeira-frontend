import { Injectable, Inject } from '@angular/core';
import { AuthConfig, AUTH_CONFIG } from '../config/auth-config';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { Authentication } from './authentication';
import { HttpClient } from '@angular/common/http';
import { tap, filter } from 'rxjs/operators';

export function isAuthenticated(config: AuthConfig): boolean {
  return null !== config.storage.getItem(config.userStorageIndex);
}

export function redirect(config: AuthConfig): void {
  window.location.href = config.loginUrl;
}

/**
 * Serviço de autenticação
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService<U extends User> extends Authentication<U> {
  loginNotifications: BehaviorSubject<User> = new BehaviorSubject<User>(
    this.getUser()
  );

  constructor(
    @Inject(AUTH_CONFIG) private config: AuthConfig,
    private http: HttpClient
  ) {
    super();
  }

  /**
   * Método para verificar se o usuário esta autenticado na aplicação
   * @returns boolean
   * @public
   */
  isAuthenticated(): boolean {
    return isAuthenticated(this.config);
  }

  /**
   * Método responsável por realizar redirecionamentos
   * @returns void
   * @public
   */
  redirect() {
    redirect(this.config);
  }

  /**
   * Método responsável pelo login da aplicação
   * @public
   * @param {User} user
   * @returns Observable<any>
   */
  login() {
    this.getUserDetails().subscribe((user) => {
      this.setUser(user);
      this.loginNotifications.next(user);
    });
  }

  /**
   * Método responsável pelo logou da aplicação
   * @public
   * @returns void
   */
  logout() {
    this.loginNotifications.next(null);
    this.config.storage.removeItem(this.config.userStorageIndex);
    window.location.href = this.config.logoutUrl;
  }

  /**
   * Método responsável por obter os dados do usuário logado
   * @public
   * @returns Observable<any>
   */
  public getUserDetails(): Observable<U> {
    return this.http.get<U>(this.config.baseUrl + this.config.detailsUrl);
  }

  private setUser(user: U) {
    this.config.storage.setItem(
      this.config.userStorageIndex,
      JSON.stringify(user)
    );
  }

  getUser(): U {
    return JSON.parse(
      this.config.storage.getItem(this.config.userStorageIndex)
    );
  }

  getLoginNotifications(): Observable<User> {
    return this.loginNotifications.pipe(filter((value) => value != null));
  }
}
