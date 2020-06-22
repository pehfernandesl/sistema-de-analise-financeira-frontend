import { ButtonModule, TooltipModule } from 'primeng';
import { NgModule } from '@angular/core';

import { ClipboardModule } from '../../base/clipboard/clipboard.module';
import { CommonModule } from '@angular/common';
import { ErrorProvider } from '../../base/error/providers/error.provider';
import { ErrorStackComponent } from './error-stack.component';
import { ErrorStackProviderService } from '../../base/error/services/error-stack-provider.service';
import { ErrorStackService } from '../../base/error/services/error-stack.service';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    ClipboardModule
  ],
  declarations: [ErrorStackComponent],
  providers: [
    ErrorStackService,
    {
      provide: ErrorProvider,
      useClass: ErrorStackProviderService,
      multi: true
    }
  ],
  exports: [ErrorStackComponent]
})
export class ErrorStackModule {}
