import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { NotificationProvider } from '../../base/error/providers/notification.provider';
import { PageNotificationComponent } from './page-notification.component';
import { PageNotificationService } from './page-notification.service';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [CommonModule, ToastModule],
  declarations: [PageNotificationComponent],
  exports: [PageNotificationComponent],
  providers: [
    MessageService,
    PageNotificationService,
    {
      provide: NotificationProvider,
      useExisting: PageNotificationService
    }
  ]
})
export class PageNotificationModule {
}
