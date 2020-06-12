import { Pipe, PipeTransform } from '@angular/core';

/**
 *
 * Cria PIPE de CNPJ para valores.
 * 
 * Usage:
 * {{ value | cnpj }}
*/

@Pipe({
  name: 'cnpj'
})

export class CnpjPipe implements PipeTransform {

  transform(value: string): string {
    if (value === null || value.length !== 14) {
      return value;
    } else {
      value = value.replace(/[^0-9A-Za-z]/g, '');
      return  value.substring(0, 2) + '.' +
      value.substring(2, 5) + '.' +
      value.substring(5, 8) + '/' +
      value.substring(8, 12) + '-' +
      value.substring(12, 14);
    }
  }
}
