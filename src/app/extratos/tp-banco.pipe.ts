import { Pipe, PipeTransform } from '@angular/core';

const BANCO_LOOKUP_TABLE = {
  value_33_: 'Santander',
  value_104_: 'Caixa'
};

@Pipe({
  name: 'tpBanco'
})
export class TpBancoPipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    return BANCO_LOOKUP_TABLE[`value_${value}_`];
  }
}
