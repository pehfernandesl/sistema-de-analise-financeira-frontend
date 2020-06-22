import { ErrorHandler, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorService } from './error.service';
import { ErrorProvider } from './providers/error.provider';
import { HttpApplicationProblemErrorService } from './services/http-application-problem-error.service';
import { HttpGenericErrorService } from './services/http-generic-error.service';

/**
 * O modulo ErrorModule contem funcionalidades para a captura e apresentação dos erros que possam ocorrer na aplicação.
 * @module
 */
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: ErrorProvider,
      useClass: HttpGenericErrorService,
      multi: true
    },
    {
      provide: ErrorProvider,
      useClass: HttpApplicationProblemErrorService,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorService
    }
  ]
})
export class ErrorModule {}
