import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs/internal/Observable";
import { Injectable } from "@angular/core";

import { FormNotificationService } from "../services/form-notification.service";
import { CleanFormNotification } from "../types/clean-form-notification.type";

/**
 * Implementação de classe para interceptar e tratar requisições http/https
 * @class
 */
@Injectable({
    providedIn: 'root',
})
export class FormNotificationInterceptor implements HttpInterceptor {

    /**
     * Método construtor
     * @constructor
     * @param {AbstractAuthentication} auth
     */
    constructor(private formNotificationService: FormNotificationService) {}

    /**
     * Método responsável por interceptar requisições HTTP/HTTPS
     * @public
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     * @returns Observable<HttpEvent<any>>
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.formNotificationService
            .notify(new CleanFormNotification(request.url));
        return next.handle(request);
    }

}
