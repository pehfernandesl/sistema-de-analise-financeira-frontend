import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { ErrorProvider } from './providers/error.provider';

/**
 * Class ErrorService
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorService extends ErrorHandler {
  /**
   * Metodo construtor responável por injetar o serviço ErrorProvider
   * @param {ErrorProvider} providers
   */
  constructor(@Inject(ErrorProvider) private providers: ErrorProvider[]) {
    super();
  }

  /**
   * Metodo responsável por idetificar e obter os erros lançados de requisições http/https
   * @param {Error} error
   * @returns void
   */
  handleError(error: Error) {
    try {
      this.providers.forEach((p) => {
        if (p.shouldHandle(error)) {
          p.handle(error);
        }
      });
    } catch (e) {}
    super.handleError(error);
  }
}
