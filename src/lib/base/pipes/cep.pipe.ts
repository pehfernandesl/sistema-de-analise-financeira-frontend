import { Pipe, PipeTransform } from '@angular/core';

/**
 *
 * Cria PIPE de CEP para valores.
 * 
 * Usage:
 * {{ value | cep }}
*/

@Pipe({
  name: 'cep'
})

export class CepPipe implements PipeTransform {

  transform(value: string): string {
    if ( value === null) {
      return '-';
    } else {
      value = value.replace(/[^0-9A-Za-z]/g, '');
      return  value.substring(0, 5) + '-' + value.substring(5, 8);
    }
  }
}
