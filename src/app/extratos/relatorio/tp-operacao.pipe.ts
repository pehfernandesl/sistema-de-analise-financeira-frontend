import { Pipe, PipeTransform } from '@angular/core';

const OPERACAO_LOOKUP_TABLE = {
  value_1_: 'Saque',
  value_2_: 'Compra com Cartão',
  value_3_: 'Pagamentos',
  value_4_: 'TED',
  value_5_: 'DOC',
  value_6_: 'Tarifa',
  value_7_: 'Remuneração',
  value_8_: 'Outros',
  value_9_: 'Depósitos'
};

@Pipe({
  name: 'tpOperacao'
})
export class TpOperacaoPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    return OPERACAO_LOOKUP_TABLE[`value_${value}_`];
  }

}
