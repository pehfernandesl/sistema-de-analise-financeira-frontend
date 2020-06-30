import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationProvider } from '../providers/notification.provider';
import { ApplicationProblemType } from '../types/application-problem.type';
import { ErrorProvider } from '../providers/error.provider';

/**
 * Serviço HttpApplicationProblemErrorService
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class HttpApplicationProblemErrorService implements ErrorProvider {
  /**
   * Metodo construtor responsável por injetar serviço NotificationProvider
   * @param {NotificationProvider} notification
   * @constructor
   */
  constructor(
    private notification: NotificationProvider,
    private ngZone: NgZone
  ) {}

  /**
   * Metodo responsável pela identificação de erros
   * @public
   * @param {Error | HttpErrorResponse} error
   * @returns Boolean
   */
  shouldHandle(error: Error | HttpErrorResponse): Boolean {
    return (
      error instanceof HttpErrorResponse &&
      error.headers.get('Content-Type') === 'application/problem+json' &&
      error.error
    );
  }

  /**
   * Metodo pela adição de erros
   * @public
   * @param {HttpErrorResponse} error
   * @returns void
   */
  handle(error: HttpErrorResponse): void {
    this.ngZone.run(() => {
      this.notification.addErrorProblem(
        new ApplicationProblemType(
          error.error.type,
          error.error.title,
          error.error.detail,
          error.error.status,
          error.error.instance
        )
      );
    });
  }
}
