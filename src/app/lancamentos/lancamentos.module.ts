import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DespesaComponent } from './despesa/despesa.component';
import { ReceitaComponent } from './receita/receita.component';
import { RouterModule } from '@angular/router';

import { routes } from './lancamentos.routes';
import { ReceitaListaComponent } from './receita/receita-lista.component';

@NgModule({
  declarations: [DespesaComponent, ReceitaComponent, ReceitaListaComponent],
  imports: [
    CommonModule, SharedModule, RouterModule.forChild(routes)
  ]
})
export class LancamentosModule {
}
