import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from './extratos.routes';
import { RouterModule } from '@angular/router';
import { ExtratoListaComponent } from './extrato-lista.component';
import { ExtratoFormComponent } from './extrato-form.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioListaComponent } from './relatorio/relatorio-lista.component';

@NgModule({
  declarations: [
    ExtratoListaComponent,
    ExtratoFormComponent,
    RelatorioComponent,
    RelatorioListaComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class ExtratosModule {}
