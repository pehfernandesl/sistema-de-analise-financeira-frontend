import { Directive, ElementRef, HostListener } from '@angular/core';

/**
 * OnlyNumbersDirective diretiva para que sejam permitidos somente números
 * @class
 */
@Directive({
    selector: 'input[onlyNumbers]'
})
export class OnlyNumbersDirective {

    /**
     * Propriedade que carrega expressão regular para numeros
     * @type {RegExp}
     */
    private regex: RegExp = new RegExp(/[^0-9]$/g);

    /**
     * Propriedade que lista opções aceitas além de núsmeros
     * @type {Array<string>}
     */
    private specialKeys: Array<string> = [
        'Backspace',
        'Delete',
        'Tab',
        'End',
        'Home',
        'ArrowLeft',
        'ArrowRight'
    ];

    /**
     * @param {ElementRef} el
     * @constructor
     */
    constructor(private el: ElementRef) { }

    /**
     * Metodo executado para os evento KeyDown do teclado executa verificação do valor digitado
     * @param {KeyboardEvent} event
     * @returns void
     */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {

        const current: string = this.el.nativeElement.value;
        const next: string = current.concat(event.key);

        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }

        if (next && String(next).match(this.regex)) {
            event.preventDefault();
        }
    }

}
