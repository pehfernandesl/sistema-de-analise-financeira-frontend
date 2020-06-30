import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  FormNotification,
  FormNotificationType
} from '../types/form-notification.type';
import { filter } from 'rxjs/operators';
import { FieldFormNotification } from '../types/field-form-notification.type';

/**
 * Serviço ṕara tratar notificações em formulários
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class FormNotificationService {
  /**
   * @type {Subject<FormNotification>()}
   */
  formNotifications: Subject<FormNotification> = new Subject<
    FormNotification
  >();

  /**
   * Método para criação de inscrição de campos presentes nos formulários
   * @param {string} field
   * @returns Observable<ResponseHandle>
   */
  notifications(form: String, field: String): Observable<FormNotification> {
    return this.formNotifications.pipe(
      filter((violation: FormNotification) => {
        return (
          (!form || violation.form === form) &&
          (violation.type === FormNotificationType.CLEAN ||
            (violation instanceof FieldFormNotification &&
              violation.field === field))
        );
      })
    );
  }

  notify(notification: FormNotification) {
    this.formNotifications.next(notification);
  }
}
