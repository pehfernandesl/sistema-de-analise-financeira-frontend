import { NgModule, ModuleWithProviders } from  '@angular/core';
import { CommonModule } from  '@angular/common';
import { AccessbilityService } from './accessibility.service';
/**
 * AccessbilityModule expõe o servico AccessbilityService para o uso de outras aplicações
 * @module
 */
@NgModule({
    imports: [CommonModule],
    providers: [AccessbilityService],
    exports: []
})
export class AccessbilityModule {
}
