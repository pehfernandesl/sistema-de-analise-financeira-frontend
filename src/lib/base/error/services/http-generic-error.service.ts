import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationProvider } from '../providers/notification.provider';
import { HttpGenericErrorType } from '../types/http-generic-error.type';
import { ErrorProvider } from '../providers/error.provider';

/**
 * Serviço HttpGenericErrorService
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class HttpGenericErrorService implements ErrorProvider {
  /**
   * Metodo construtor responsávelpor injetar o serviço NotificationProvider
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
      !(
        error.headers.get('Content-Type') === 'application/problem+json' &&
        error.error
      )
    );
  }

  /**
   * Metodo pela adição de erros
   * @public
   * @param {HttpErrorResponse} error
   * @returns void
   */
  handle(error: HttpErrorResponse): void {
    const generic = this.getErrorByCode(error);
    this.ngZone.run(() => {
      this.notification.addErrorMessage(generic.detail, generic.title);
    });
  }

  /**
   * Metodo para obter erros a partir de um código
   * @public
   * @param {HttpErrorResponse} error
   * @returns HttpGenericErrorType
   */
  public getErrorByCode(error: HttpErrorResponse): HttpGenericErrorType {
    const generic = GENERIC_ERRORS[error.status];

    if (generic === undefined) {
      return new HttpGenericErrorType(
        error.status,
        error.statusText,
        error.message
      );
    }

    return generic;
  }
}
/**
 * Constante que define tipos de erros básicos
 * @const GENERIC_ERRORS
 */
export const GENERIC_ERRORS = {
  401: new HttpGenericErrorType(
    401,
    'Não Autenticado',
    'Essa requisição requer um usuário autenticado.'
  ),

  403: new HttpGenericErrorType(
    403,
    'Proibido',
    'Essa requisição requer uma permissão no servidor da aplicação que o usuário não possui.'
  ),

  404: new HttpGenericErrorType(
    404,
    'Não encontrado',
    'Essa requisição não pode ser encontrada.'
  ),

  500: new HttpGenericErrorType(
    500,
    'Erro desconhecido',
    'O servidor encontrou uma condição inesperada.'
  ),

  502: new HttpGenericErrorType(
    502,
    'Bad Gateway',
    'O servidor recebeu uma resposta inválida de um serviço que utilizou para cumprir a requisição'
  ),

  503: new HttpGenericErrorType(
    503,
    'Serviço Indisponível',
    'O servidor não pode atender a requisição nesse momento. Esta é uma condição temporária, tente novamente mais tarde'
  ),

  504: new HttpGenericErrorType(
    504,
    'Gateway Timeout',
    'O servidor não conseguiu receber uma resposta a tempo esperado por um serviço que utilizou para cumprir a requisição'
  )
};
