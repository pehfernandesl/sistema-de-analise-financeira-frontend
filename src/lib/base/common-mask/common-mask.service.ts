import { Injectable } from '@angular/core';

/**
 *
 * Class CommonMaskService serviço para inserção de mascara de data em campos input
 * @class 
 */
@Injectable({
  providedIn: 'root',
})
export class CommonMaskService {

    /**
     * DATE_SEPARATOR property
     * @type {string}
     */
    private readonly DATE_SEPARATOR = '/';

    /**
     * Metodo para formatar valor digitado no padrão dd/mm/yyyy
     * @param $event
     * @returns void
     */
    dateMask($event) {
        if ($event.target.value) {
            let date = $event.target.value.replace(/[^0-9]/g, '').substr(0, 8);
            
            if (date.length >= 3) {
              date = date.replace(/^(\d{2})(\d{1,2})/, '$1' + this.DATE_SEPARATOR + '$2');
            }
            
            if (date.length >= 6) {
              date = date.replace(/^(\S{5})(\d{1,4})/, '$1' + this.DATE_SEPARATOR + '$2');
            }

            $event.target.value = date;
        }
    }
}
