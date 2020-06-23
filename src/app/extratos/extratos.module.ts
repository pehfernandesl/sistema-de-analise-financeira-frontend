import { CommonModule } from '@angular/common';
import { ExtratoFormComponent } from './extrato-form.component';
import { ExtratoListaComponent } from './extrato-lista.component';
import { LOCALE_ID } from '@angular/core';
import { NgModule } from '@angular/core';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioListaComponent } from './relatorio/relatorio-lista.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { TpBancoPipe } from './tp-banco.pipe';
import { TpOperacaoPipe } from './relatorio/tp-operacao.pipe';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { routes } from './extratos.routes';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    ExtratoListaComponent,
    ExtratoFormComponent,
    RelatorioComponent,
    RelatorioListaComponent,
    TpBancoPipe,
    TpOperacaoPipe
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class ExtratosModule {}
