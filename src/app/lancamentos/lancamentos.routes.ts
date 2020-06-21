import { Routes } from '@angular/router';
import { DespesaListaComponent } from './despesa/despesa-lista.component';
import { ReceitaListaComponent } from './receita/receita-lista.component';
import { ReceitaFormComponent } from './receita/receita-form.component';

export const routes: Routes = [
  {
    path: 'despesas',
    component: DespesaListaComponent,
    data: { breadcrumb: 'Minhas Despesas' }
  },
  {
    path: 'receitas',
    component: ReceitaListaComponent,
    data: { breadcrumb: 'Minhas Receitas' },
  },
  {
    path: 'receitas/new',
    component: ReceitaFormComponent,
    data: { breadcrumb: 'Nova Receita' }
  }
];
