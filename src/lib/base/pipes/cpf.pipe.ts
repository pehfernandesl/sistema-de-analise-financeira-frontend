import { Pipe, PipeTransform } from '@angular/core';

/**
 *
 * Cria PIPE de CPF para valores.
 *
 * Usage:
 * {{ value | cpf }}
 */

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {
  transform(value: string): string {
    if (value === null || value.length !== 11) {
      return value;
    } else {
      value = value.replace(/[^0-9A-Za-z]/g, '');
      return (
        value.substring(0, 3) +
        '.' +
        value.substring(3, 6) +
        '.' +
        value.substring(6, 9) +
        '-' +
        value.substring(9, 11)
      );
    }
  }
}
