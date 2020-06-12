
enum FormNotificationType { CLEAN, FIELD }

/**
 * Class modelo para validação de formulários
 * @class
 */
class FormNotification {

    /**
     * Metodo construtor para validação de formulários
     * @param {string} form
     * @param {FormNotificationType} type
     */
    constructor(
        public form: string, 
        public type: FormNotificationType) {
    }

}

export { FormNotificationType, FormNotification }
