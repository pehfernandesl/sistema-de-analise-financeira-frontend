import {
  FormNotification,
  FormNotificationType
} from './form-notification.type';

/**
 * Class modelo para limpeza de validação de formulários
 * @class
 */
export class CleanFormNotification extends FormNotification {
  /**
   * Método construtor para limpeza de validação de formulários
   * @param {string} form
   */
  constructor(form: string) {
    super(form, FormNotificationType.CLEAN);
  }
}
