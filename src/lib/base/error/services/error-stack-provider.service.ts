import { Injectable } from '@angular/core';
import { ErrorProvider } from '../providers/error.provider';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorStackService } from './error-stack.service';

/**
 * Class ErrorStackProviderService
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorStackProviderService implements ErrorProvider {
  /**
   * Metodo construtor responsável por injetar o serviso de erros
   * @param {ErrorStackService} errorStackService
   */
  constructor(private errorStackService: ErrorStackService) {}

  /**
   * Metodo responsável pela identificação de erros
   * @param {Error} error
   * @returns Boolean
   */
  shouldHandle(error: Error): Boolean {
    return error instanceof HttpErrorResponse;
  }

  /**
   * Metodo pela adição de erros
   * @param {HttpErrorResponse} error
   * @returns void
   */
  handle(error: HttpErrorResponse) {
    this.errorStackService.create(error);
  }
}
