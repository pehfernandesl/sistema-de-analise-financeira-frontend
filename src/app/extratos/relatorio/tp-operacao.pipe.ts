import { Pipe, PipeTransform } from '@angular/core';

export const OPERACAO_LOOKUP_TABLE = {
  value_1_: { label: 'Saque', color: '#FF0000' },
  value_2_: { label: 'Compra com Cartão', color: '#00FF00' },
  value_3_: { label: 'Pagamentos', color: '#0000FF' },
  value_4_: { label: 'TED', color: '#A0FF01' },
  value_5_: { label: 'DOC', color: '#F0F0F0' },
  value_6_: { label: 'Tarifa', color: '#FF00FF' },
  value_7_: { label: 'Remuneração', color: '#FFFFFF' },
  value_8_: { label: 'Outros', color: '#000000' },
  value_9_: { label: 'Depósitos', color: '#808080' }
};

@Pipe({
  name: 'tpOperacao'
})
export class TpOperacaoPipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    return OPERACAO_LOOKUP_TABLE[`value_${value}_`].label;
  }
}
