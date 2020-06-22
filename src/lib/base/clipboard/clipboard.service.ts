import { Injectable } from '@angular/core';

/**
 * Fornece metodo para copia de textos
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  /**
   * Inspirado no clipboard.js, copia texto selecionado para área de trasferência
   * @param {string} text
   * @returns void
   * @public
   */
  copy(text: string) {
    const isRTL: boolean =
      document.documentElement.getAttribute('dir') === 'rtl';

    // cria um elemento temporário, seta o foco, copia e remove em seguida
    let fake: HTMLTextAreaElement = document.createElement('textarea');
    fake.style.fontSize = '12pt';
    fake.style.border = '0';
    fake.style.padding = '0';
    fake.style.margin = '0';
    fake.style.position = 'absolute';
    fake.style[isRTL ? 'right' : 'left'] = '-9999px';

    let yPosition: number =
      window.pageYOffset || document.documentElement.scrollTop;

    fake.style.top = `${yPosition}px`;
    fake.setAttribute('readonly', '');
    fake.value = text;

    document.body.appendChild(fake);

    fake.select();

    document.execCommand('copy');
    document.body.removeChild(fake);
  }
}
