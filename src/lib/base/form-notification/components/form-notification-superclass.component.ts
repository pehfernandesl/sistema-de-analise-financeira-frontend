import { FormNotificationService } from '../services/form-notification.service';
import { Directive, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormNotification } from '../types/form-notification.type';
import { FieldFormNotification } from '../types/field-form-notification.type';

@Directive({
  selector: 'form-notification-component-superclass'
})
export class FormNotificationComponentSuperclass implements OnInit, OnDestroy {
  private subscription: Subscription;

  @Input() name: String;

  @Input() form: String;

  message: String;

  /**
   * Metodo construtor responsavel por carregar o serviço de validação
   * @param formNotificationService
   */
  constructor(protected formNotificationService: FormNotificationService) {}

  /**
   * Metodo Inicial para subscrição no endpoint responsável por validar o formulário
   */
  ngOnInit(): void {
    this.subscription = this.formNotificationService
      .notifications(this.form, this.name)
      .subscribe((notification: FormNotification) => {
        if (notification instanceof FieldFormNotification) {
          this.message = notification.message;
        } else {
          this.message = null;
        }
      });
  }

  /**
   * Metodo responsavel por realizar a saida das subscrições do endpont de validação
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
