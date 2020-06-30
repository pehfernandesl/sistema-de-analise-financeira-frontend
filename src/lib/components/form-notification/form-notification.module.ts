import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormNotificationBaseModule } from '../../base/form-notification/form-notification.module';
import { FormNotificationComponent } from './form-notification.component';

@NgModule({
  imports: [CommonModule, FormNotificationBaseModule],
  declarations: [FormNotificationComponent],
  exports: [FormNotificationComponent]
})
export class FormNotificationModule {}
