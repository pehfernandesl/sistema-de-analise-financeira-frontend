import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

/**
 * AccessbilityService Serviço de acessibilidade, este serviço prove recursos de contraste
 * de tela e controle do tamanho da fonte apresentadas na tela.
 * @class
 */
@Injectable({
    providedIn: 'root',
})
export class AccessbilityService {

    private renderer: Renderer2

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    /**
     * Propriedade que define tamanho da fonte
     * @type {number}
     */
    private fontSize: number = 1.0;

    /**
     * Medoto para habilitar contraste
     * @public
     * @returns void
     */
    enableHighContrast() {
        this.renderer.addClass(document.body, 'contraste');
    }

    /**
     * Metodo para desabilitar contraste
     * @public
     * @returns void
     */
    disableHighContrast() {
        this.renderer.removeClass(document.body, 'contraste');
    }

    /**
     * Metodo utilizado para aumentar o tamnho da fonte apresentada no display
     * @public
     * @returns void
     */
    increaseFontSize() {
        this.fontSize += 0.1;
        this.renderer.setStyle(document.querySelector('div.layout-wrapper'), 'font-size', this.fontSize + 'em');
    }

    /**
     * Metodo utilizado para diminuir o tamnho da fonte apresentada no display
     * @public
     * @returns void
     */
    decreaseFontSize() {
        this.fontSize -= 0.1;
        this.renderer.setStyle(document.querySelector('div.layout-wrapper'), 'font-size', this.fontSize + 'em');
    }

    addAccessibilityIcons() {
        const elements = document.querySelector('.ui-button-icon-left, ui-button-icon-righ');

        if (elements) {
            this.renderer.setStyle(elements, 'aria-hidden', true);
        }
    }

    addAccessibilityMessages(msg: {severity: string}) {
        let type = 'polite';
        if (msg.severity.toLowerCase() !== 'custom' && msg.severity.toLowerCase() !== 'success') {
            type = 'assertive';
        }

        this.renderer.setStyle(document.querySelector('p-toast, p-growl'), 'aria-live', type);
    }

}
