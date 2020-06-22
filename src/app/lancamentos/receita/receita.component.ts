import { Component, OnInit, Output } from '@angular/core';
import { Receita } from './receita';

@Component({
  selector: 'safi-receita',
  template: `
    <div class="ui-g ui-fluid">
      <div class="ui-g-12">
        <div class="ui-g-12">
          <span class="md-inputfield" style="margin-top: 5px;">
            <input pInputText disabled [value]="receita?.descricao" />
            <label>Descrição</label>
          </span>
        </div>
        <div class="ui-g-12">
          <span class="md-inputfield" style="margin-top: 5px;">
            <input pInputText disabled [value]="receita?.valor" />
            <label>R$ Valor</label>
          </span>
        </div>
        <div class="ui-g-12">
          <span class="md-inputfield" style="margin-top: 5px;">
            <input pInputText disabled [value]="receita?.dataLancamento" />
            <label>Data de Lançamento</label>
          </span>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ReceitaComponent implements OnInit {
  @Output() public receita: Receita;

  constructor() {}

  ngOnInit(): void {}
}
