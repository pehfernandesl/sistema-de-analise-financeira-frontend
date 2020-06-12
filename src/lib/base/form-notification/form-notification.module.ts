import { NgModule } from '@angular/core';
import { FormNotificationErrorProvider } from './services/form-notification-error-provider.service';
import { FormNotificationService } from './services/form-notification.service';
import { ErrorProvider } from '../error/providers/error.provider';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormNotificationInterceptor } from './interceptor/form-notification.interceptor';
import { FormNotificationComponentSuperclass } from './components/form-notification-superclass.component';

/**
 * Módulo para adicionar funcionalidade de notificação de erros de formulários.
 * @module
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ FormNotificationComponentSuperclass ],
    exports: [ FormNotificationComponentSuperclass],
    providers: [
        FormNotificationService,
        {
            provide: ErrorProvider,
            useClass: FormNotificationErrorProvider,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FormNotificationInterceptor,
            multi: true,
        },
    ],
})
export class FormNotificationBaseModule { }
