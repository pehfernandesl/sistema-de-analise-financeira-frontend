import { BlockUIModule } from 'primeng/blockui';
import { BlockUiComponent } from './block-ui.component';
import { BlockUiInterceptor } from '../../base/block-ui/block-ui.interceptor';
import { BlockUiService } from '../../base/block-ui/block-ui.service';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  imports: [CommonModule, BlockUIModule, ProgressSpinnerModule],
  declarations: [BlockUiComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BlockUiInterceptor,
      multi: true
    },
    BlockUiService
  ],
  exports: [BlockUIModule, BlockUiComponent, ProgressSpinnerModule]
})
export class BlockUiModule {}
