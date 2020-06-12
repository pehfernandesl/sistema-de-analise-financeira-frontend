import { UnmaskDirective } from './unmask.directive';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { NgModule } from '@angular/core';

/**
 * DIRECTIVES constant
 * @constant
 */
const DIRECTIVES = [
    OnlyNumbersDirective,
    UnmaskDirective
];

/**
 * Expõe directivas para reuso em outras palicações
 * @module
 */
@NgModule({
    declarations: DIRECTIVES,
    exports: DIRECTIVES
})
export class DirectivesModule {}
