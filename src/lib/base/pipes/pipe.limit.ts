import { Pipe, PipeTransform } from '@angular/core';

/**
 *
 * Cria PIPE para valores com restrição de valores a serem apresentados.
 * 
 * Usage:
 * {{ value | limit:20 }}
 * {{ value | limit:20:"..." }}
*/

@Pipe({
    name: 'limit'
})

export class LimitPipe implements PipeTransform {

    transform(value: string, limit = 25, ellipsis = '...') {
        return value.length > limit
            ? `${value.substr(0, limit)}${ellipsis}`
            : value;
    }
}
