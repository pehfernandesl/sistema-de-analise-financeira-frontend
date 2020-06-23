import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { CadastroUsuarioComponent } from './cadastro-usuario.component';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroUsuarioComponent
  },
  {
    path: '',
    component: DashboardComponent,
    data: { breadcrumb: 'Home' },
    canActivate: [AuthGuard]
  },
  {
    path: 'lancamentos',
    loadChildren: 'src/app/lancamentos/lancamentos.module#LancamentosModule',
    data: { breadcrumb: 'Lançamentos' },
    canActivate: [AuthGuard]
  },
  {
    path: 'extratos',
    loadChildren: 'src/app/extratos/extratos.module#ExtratosModule',
    data: { breadcrumb: 'Extratos' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
