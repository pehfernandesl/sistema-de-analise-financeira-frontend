import { Pipe, PipeTransform } from '@angular/core';

/**
 *
 * Cria PIPE de valores com regra definida em expressão regex
 * Usage:
 * {{ value | regex:arg1:arg2 }}
 */

@Pipe({
  name: 'regex'
})
export class RegexPipe implements PipeTransform {
  transform(value: any, regex: any, regexPrint: any): any {
    return value.replace(regex, regexPrint);
  }
}
