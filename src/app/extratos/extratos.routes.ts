import { ExtratoFormComponent } from './extrato-form.component';
import { ExtratoListaComponent } from './extrato-lista.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioListaComponent } from './relatorio/relatorio-lista.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: ExtratoListaComponent,
    data: { breadcrumb: 'Lista de Extratos' }
  },
  {
    path: 'new',
    component: ExtratoFormComponent,
    data: { breadcrumb: 'Novo Extrato' }
  },
  // {
  //   path: 'relatorios',
  //   component: RelatorioComponent,
  //   data: { breadcrumb: 'Relatórios' }
  // },
  {
    path: 'relatorios/show/:mes',
    component: RelatorioListaComponent,
    data: { breadcrumb: 'Relatório Mensal' }
  }
];
