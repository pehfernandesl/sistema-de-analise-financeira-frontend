import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PageNotificationService } from '../page-notification/page-notification.service';

enum STATUS { OK = 200, CREATED = 201 }

@Injectable({ providedIn: 'root' })
export class SuccessMessageHandlerInterceptor implements HttpInterceptor {

  constructor(private notification: PageNotificationService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.headers.has('X-nuvem-alert')) {
            this.notification.addSuccessMessage(event.headers.get('X-nuvem-alert'));
          } else if ((event.status === STATUS.OK || event.status === STATUS.CREATED) && req.method != 'GET') {
            this.notification.addSuccessMessage('Operação realizada com sucesso!');
          }
        }
      })
    );
  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SuccessMessageHandlerInterceptor, multi: true }
];
