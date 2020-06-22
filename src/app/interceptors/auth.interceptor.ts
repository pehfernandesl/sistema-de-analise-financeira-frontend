import { Observable } from 'rxjs';
import { LocalStorageService } from './../shared/local-storage/local-storage.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public localStorageService: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interceptor');
    const token = this.localStorageService.getTokenFromStorage();
    if (token) {
      console.log('Tem Token');
      const authReq = req.clone({
        headers: new HttpHeaders().set('Authorization', token)
      });
      console.log(authReq.headers);
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
