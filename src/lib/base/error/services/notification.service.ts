import { ApplicationProblemType } from '../types/application-problem.type';
import { NotificationProvider}  from '../providers/notification.provider';
import { Injectable } from '@angular/core';

/**
 * Class NotificationService
 * @class
 */
@Injectable({
    providedIn: 'root',
})
export class NotificationService extends NotificationProvider {

    /**
     * Metodo responsável po adicionar mensagem de erro
     * @param {string} message
     * @param {string} title
     * @returns void
     */
    addErrorMessage(message: string, title?: string): void {
        console.error(title + ' ' + message);
    }

    /**
     * Metodo responsável por adicionar o detalhamento do erro no console
     * @param {ApplicationProblemType} problem
     * @returns void
     */
    addErrorProblem(problem: ApplicationProblemType): void {
        console.error(problem.title + ' ' + problem.detail);
    }

}
