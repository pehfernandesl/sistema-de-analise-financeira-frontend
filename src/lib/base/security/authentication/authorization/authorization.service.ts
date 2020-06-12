
import { Injectable } from '@angular/core';
import { Authorization } from './authorization';
import { Authentication } from '../authentication';
import { User } from '../user';

/**
 * Serviço de autorização 
 * @class
 */
@Injectable({
    providedIn: 'root',
})
export class AuthorizationService extends Authorization {

    /**
     * Método construtor para a injeção do serviço de configuração AuthConfig
     * @constructor
     * @param {AuthConfig} config
     */
    constructor(private authenticationService: Authentication<User>) {
        super();
    }

    /**
     * Método responsável por identificar as regras de acesso
     * @public
     * @param {any} role
     * @returns boolean
     */
    hasRole(role: any): boolean {
        if (role) {
            const user = this.authenticationService.getUser();
            if (role instanceof Array) {
                return user.roles.some((userRole: string) => role.some((checkRole: string) => userRole === checkRole));
            }
            return user.roles.some((userRole: string) => userRole === role);
        }
        return true;
    }

}
