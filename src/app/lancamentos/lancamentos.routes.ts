import { DespesaFormComponent } from './despesa/despesa-form.component';
import { DespesaListaComponent } from './despesa/despesa-lista.component';
import { ReceitaFormComponent } from './receita/receita-form.component';
import { ReceitaListaComponent } from './receita/receita-lista.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'despesas',
    component: DespesaListaComponent,
    data: { breadcrumb: 'Minhas Despesas' }
  },
  {
    path: 'receitas',
    component: ReceitaListaComponent,
    data: { breadcrumb: 'Minhas Receitas' }
  },
  {
    path: 'receitas/new',
    component: ReceitaFormComponent,
    data: { breadcrumb: 'Lançamentos/Nova Receita' }
  },
  {
    path: 'despesas/new',
    component: DespesaFormComponent,
    data: { breadcrumb: 'Lançamentos/Nova Despesa' }
  }
];
