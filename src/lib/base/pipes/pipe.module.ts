import { NgModule } from '@angular/core';
import { CpfPipe } from './cpf.pipe';
import { CepPipe } from './cep.pipe';
import { CnpjPipe } from './cnpj.pipe';
import { RegexPipe } from './pipe.regex';
import { LimitPipe } from './pipe.limit';

/**
 *
 *  Export do módulo
 */
@NgModule({
  imports: [],
  declarations: [CepPipe, CpfPipe, CnpjPipe, RegexPipe, LimitPipe],
  exports: [CepPipe, CpfPipe, CnpjPipe, RegexPipe, LimitPipe]
})
export class PipeModule {}
