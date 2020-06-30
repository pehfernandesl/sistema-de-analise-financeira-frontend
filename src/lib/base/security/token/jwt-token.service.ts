import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import { Token } from './token';
import { AuthConfig, AUTH_CONFIG } from '../config/auth-config';

/**
 * Inplementação de serviço JWTTokenService
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class JWTTokenService extends Token {
  /**
   * TOKEN_PREFIX  property
   * @type {string}
   */
  public static readonly TOKEN_PREFIX = 'Bearer';

  /**
   * HEADER_STRING property
   * @type {string}
   */
  public static readonly HEADER_STRING = 'Authorization';

  /**
   * Metodo construtor responsável por injetar as configurações de autenticação
   * @constructor
   * @param {AuthConfig} config
   */
  constructor(@Inject(AUTH_CONFIG) private config: AuthConfig) {
    super();
  }
  /**
   * Metodo responsável pela extração de tokes do heaedrs das requisições
   * @public
   * @param {HttpHeaders} headers
   * @returns string
   */
  extractTokenFromHeaders(headers: HttpHeaders): String {
    return headers.get(JWTTokenService.HEADER_STRING);
  }

  /**
   * Metodo responsável pela adição dos tokens no storage
   * @public
   * @param {String} token
   * @returns void
   */
  storeToken(token: String) {
    this.config.storage.setItem(
      this.config.tokenStorageIndex,
      token.toString()
    );
  }

  /**
   * Metodo responsável por injetar token no header das requisições
   * @public
   * @param {HttpRequest<any>} request
   * @returns HttpRequest<any>
   */
  setTokenInHeader(request: HttpRequest<any>): HttpRequest<any> {
    const req: HttpRequest<any> = request.clone({
      headers: new HttpHeaders({
        [JWTTokenService.HEADER_STRING]: this.config.storage.getItem(
          this.config.tokenStorageIndex
        )
      })
    });
    return req;
  }

  /**
   * Metodo responsável por verificar a existencia de um token de autenticação
   * @returns boolean
   * @public
   */
  hasToken(): boolean {
    return null !== this.config.storage.getItem(this.config.tokenStorageIndex);
  }
}
