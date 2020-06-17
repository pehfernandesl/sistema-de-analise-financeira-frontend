import { Routes } from '@angular/router';
import { DespesaComponent } from './despesa/despesa.component';
import { ReceitaListaComponent } from './receita/receita-lista.component';

export const routes: Routes = [
  {
    path: 'despesas',
    component: DespesaComponent,
    data: { breadcrumb: 'Minhas Despesas' }
  },
  {
    path: 'receitas',
    component: ReceitaListaComponent,
    data: { breadcrumb: 'Minhas Receitas' }
  }
];
