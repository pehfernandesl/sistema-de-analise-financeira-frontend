import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: 'lancamentos',
    loadChildren: 'src/app/lancamentos/lancamentos.module#LancamentosModule',
    data: { breadcrumb: 'Lançamentos' }
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
