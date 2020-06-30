import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonMaskService } from './common-mask.service';
/**
 * CommonMaskModule expõe o servico CommonMaskService para o uso de outras aplicações
 * @class
 */
@NgModule({
  imports: [],
  declarations: [],
  providers: [CommonMaskService],
  exports: []
})
export class CommonMaskModule {}
