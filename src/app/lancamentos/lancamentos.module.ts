import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DespesaListaComponent } from './despesa/despesa-lista.component';
import { DespesaComponent } from './despesa/despesa.component';
import { routes } from './lancamentos.routes';
import { ReceitaListaComponent } from './receita/receita-lista.component';
import { ReceitaComponent } from './receita/receita.component';
import { ReceitaFormComponent } from './receita/receita-form.component';

@NgModule({
  declarations: [
    DespesaComponent,
    DespesaListaComponent,
    ReceitaComponent,
    ReceitaListaComponent,
    ReceitaFormComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class LancamentosModule {}
