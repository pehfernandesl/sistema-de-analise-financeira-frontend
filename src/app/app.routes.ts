import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'lancamentos',
  //   loadChildren: 'src/app/lancamentos/lancamentos.module#LancamentosModule',
  //   data: { breadcrumb: 'Lançamentos' }
  // }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
