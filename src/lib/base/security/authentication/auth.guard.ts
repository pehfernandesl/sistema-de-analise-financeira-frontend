import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Authentication } from './authentication';
import { User } from './user';

/**
 * Guard que verifica se usuário está autenticado antes do usuário acessar uma rota. 
 * Se for verificar que o usuário não está autenticado, é feito um redirecionamento para o login.
 * @class
 */
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {

    /**
     * Método construtor responsável pela injeção do serviço de autenticação
     * @constructor
     * @param {Authentication} auth
     */
    constructor(private authenticationService: Authentication<User>) {}

    /**
     * Método responsável por identificar se o usuário está autenticado
     * @public
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns boolean
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.isAuthenticated()) {
            return true;
        }
        this.authenticationService.redirect();
        return false;
    }

    /**
     * Método responsável por atuar somente em rotas filhas de modo independente
     * @public
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns boolean
     */
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

}
