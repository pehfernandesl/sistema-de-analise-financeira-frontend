
import { Routes } from '@angular/router';
import { ExtratoListaComponent } from './extrato-lista.component';
import { ExtratoFormComponent } from './extrato-form.component';

export const routes: Routes = [
    {
      path: '',
      component: ExtratoListaComponent,
    },
    {
      path: 'new',
      component: ExtratoFormComponent,
    }
  ];
