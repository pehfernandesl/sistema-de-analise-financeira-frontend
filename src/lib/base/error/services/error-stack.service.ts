import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { NamedErrorType } from '../types/named-error.type';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpGenericErrorService } from '../services/http-generic-error.service';

/**
 * Serviço de erros ErrorStackService
 * @class 
 */
@Injectable({
    providedIn: 'root',
})
export class ErrorStackService {

    /**
     * Propriedade errors
     * @type {ReplaySubject<NamedErrorType>}
     */
    errors: ReplaySubject<NamedErrorType> = new ReplaySubject<NamedErrorType>();

    /**
     * metodo construtor injeta serviço generico de erros
     * @param {HttpGenericErrorService} genericErrorService
     * @constructor
     */
    constructor(private genericErrorService: HttpGenericErrorService) {
        if (null === localStorage.getItem('errorStack')) {
            localStorage.setItem('errorStack', JSON.stringify([]));
        }

        this.getErrorsSubjects().forEach((error: NamedErrorType) => {
            this.errors.next(error);
        });
    }

    /**
     * Metodo responsável por criar erro do tipo HttpResponse
     * @param {HttpErrorResponse} error
     * @returns void
     */
    create(error: HttpErrorResponse) {
        const namedError = this.createNamedError(error);

        const persistedErrors: NamedErrorType[] = this.getErrorsSubjects();

        if (persistedErrors.length >= 15) {
            persistedErrors.shift();
        }

        persistedErrors.push(namedError);

        localStorage.setItem('errorStack', JSON.stringify(persistedErrors));

        this.errors.next(namedError);
    }

    /**
     * Metodo responsável por obter o conteúdo dos erros emitidos
     * @private
     * @returns NamedErrorType[]
     */
    private getErrorsSubjects(): NamedErrorType[] {
        return JSON.parse(localStorage.getItem('errorStack'));
    }

    /**
     * Metodo responsável por itentifica o tipo de erro lançado
     * @private
     * @param {HttpErrorResponse} error
     * @returns NamedErrorType
     */
    private createNamedError(error: HttpErrorResponse): NamedErrorType {
        let fullMessage: string;
        let namedError: NamedErrorType;
        let createdAt: Date = new Date();
        let errorId = this.getErrorId(error);
        let title: string | null;

        if (error.headers.get('Content-Type') === 'application/problem+json') {
            fullMessage = `X-Correlation-ID: ${errorId}
                           createdAt: ${createdAt}
                           status: ${error.status}
                           url: ${error.url}
                           body: ${error.error.detail}
                           stacktrace: ${error.error.stacktrace}
                           cause: ${error.error.cause}`;

            title = error.error.title;

        } else {
            const genericError = this.genericErrorService.getErrorByCode(error);

            fullMessage = `X-Correlation-ID: ${errorId}
                           createdAt: ${createdAt}
                           status: ${error.status}
                           url: ${error.url}
                           body: ${genericError.detail}`;

            title = genericError.title;
        }

        namedError = {
            message: title,
            createdAt: createdAt,
            correlationId: errorId,
            fullMessage: fullMessage
        };

        return namedError;
    }

    /**
     * Metodo responsável por obter o identificador do erro
     * @private 
     * @param {HttpErrorResponse} error
     * @returns string
     */
    private getErrorId(error: HttpErrorResponse): string {
        let errorKey: string | null;

        error.headers.keys().every(key => {
            if (key.toUpperCase() === 'X-CORRELATION-ID') {
                errorKey = key;
                return false;
            }
            return true;
        });

        return errorKey ? error.headers.get(errorKey) : null;
    }

}
