import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Token } from './token';

/**
 * Implementação de classe para interceptar e tratar requisições http/https
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class JWTAuthInterceptor implements HttpInterceptor {
  /**
   * Metodo construtor responsável por injetar serviço de autenticação
   * @constructor
   * @param {AbstractAuthentication} auth
   */
  constructor(private token: Token) {}

  /**
   * Metodo responsável por interceptar requisições HTTP/HTTPS
   * @public
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns Observable<HttpEvent<any>>
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token.hasToken()) {
      request = this.token.setTokenInHeader(request);
    }
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const token: String = this.token.extractTokenFromHeaders(
            event.headers
          );
          if (null !== token) this.token.storeToken(token);
        }
        return event;
      })
    );
  }
}
