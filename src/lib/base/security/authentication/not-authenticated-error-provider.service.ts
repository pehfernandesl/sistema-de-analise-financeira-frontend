
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorProvider } from '../../error/providers/error.provider';
import { Authentication } from './authentication';
import { User } from './user';

/**
 * Provedor de error para criação de erros de notificação.
 * @class
 */
@Injectable({
    providedIn: 'root',
})
export class NotAuthenticatedErrorProvider implements ErrorProvider {

    constructor(private authenticationService: Authentication<User>) { }

    /**
     * Método para identificar se o usuário está logado
     * @public
     * @param {HttpErrorResponse} error
     * @returns void
     */
    shouldHandle(error: Error | HttpErrorResponse): Boolean {
        return error instanceof HttpErrorResponse && error.status == 401;
    }

    /**
     * Método para redirecionar caso o usuário não esteja
     * @public
     * @param {HttpErrorResponse} error
     * @returns void
     */
    handle(error: HttpErrorResponse): void {
        this.authenticationService.redirect();
    }

}
