/* tslint:disable: component-selector */
import { Component } from '@angular/core';

import { FormNotificationComponentSuperclass } from '../../base/form-notification/components/form-notification-superclass.component';

@Component({
  selector: '[form-notification]',
  templateUrl: 'form-notification.component.html'
})
export class FormNotificationComponent extends FormNotificationComponentSuperclass {
}
