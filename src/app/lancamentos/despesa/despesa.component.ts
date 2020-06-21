import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Despesa } from './despesa';

@Component({
  selector: 'safi-despesa',
  template: `
    <div class="ui-g ui-fluid">
      <div class="ui-g-12">
          <div class="ui-g-12">
            <span class="md-inputfield" style="margin-top: 5px;">
              <input pInputText disabled [value]="despesa.descricao"/>
              <label>Descrição</label>
            </span>
          </div>
          <div class="ui-g-12">
          <span class="md-inputfield" style="margin-top: 5px;">
              <input pInputText disabled [value]="despesa.valor"/>
              <label>R$ Valor</label>
            </span>
          </div>
          <div class="ui-g-12">
            <span class="md-inputfield" style="margin-top: 5px;">
              <input pInputText disabled [value]="despesa.dataLancamento"/>
              <label>Data de Lançamento</label>
            </span>
          </div>
      </div>
    </div>
  `,
})
export class DespesaComponent implements OnInit {
  public despesa: Despesa;

  constructor() {}

  ngOnInit(): void {}
}
