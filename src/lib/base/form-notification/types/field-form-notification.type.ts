import {
  FormNotification,
  FormNotificationType
} from './form-notification.type';

/**
 * Class modelo para validação de campos de formulários
 * @class
 */
export class FieldFormNotification extends FormNotification {
  /**
   * Método construtor para validação de campos de formulários
   * @param {string} form
   * @param {string} field
   * @param {string} message
   */
  constructor(form: string, public field: string, public message: string) {
    super(form, FormNotificationType.FIELD);
  }
}
