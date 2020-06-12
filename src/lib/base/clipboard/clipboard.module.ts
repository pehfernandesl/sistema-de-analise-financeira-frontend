import { NgModule, ModuleWithProviders } from '@angular/core';
import { ClipboardDirective } from './clipboard.directive';
import { ClipboardService } from './clipboard.service';

/**
 * ClipboardModule expõe o servico ClipboardService para o uso de outras aplicações
 * @module
 */
@NgModule({
  imports: [],
  declarations: [
    ClipboardDirective,
  ],
  providers: [
    ClipboardService
  ],
  exports: [
    ClipboardDirective,
  ]
})
export class ClipboardModule {
}
