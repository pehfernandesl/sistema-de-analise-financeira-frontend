import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: DashboardComponent,
    data: { breadcrumb: 'DashBoard' },
    canActivate: [AuthGuard]
  },
  {
    path: 'lancamentos',
    loadChildren: 'src/app/lancamentos/lancamentos.module#LancamentosModule',
    data: { breadcrumb: 'Lançamentos' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
