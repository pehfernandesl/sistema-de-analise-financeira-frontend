import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators';
import { BlockUiService } from './block-ui.service';

/**
 * Class BlockUiInterceptor
 * @class
 */
@Injectable({
    providedIn: 'root'
})
export class BlockUiInterceptor implements HttpInterceptor {

    /**
     * constructor method
     * @constructor
     * @param {BlockUiService} service 
     */
    constructor(private service: BlockUiService) {}

    /**
     * intercept method
     * @public 
     * @param {HttpRequest<any>} req
     * @param {HttpHandler} next
     * @return Observable<HttpEvent<any>>
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.isMutation(req.method)) {
            this.service.show();
        }

        return next.handle(req).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.service.hide();
                    }
                },
                (err: any) => {
                    this.service.hide();
                }
            )
        );
    }
    /**
     * isMutation method
     * @private
     * @param {string} method
     * @return boolean
     */
    private isMutation(method: string): boolean {
        const mutationsMethods = [
            'DELETE',
            'PATCH',
            'POST',
            'PUT'
        ];

        return mutationsMethods.indexOf(method) !== -1;
    }
}
