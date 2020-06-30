import { Component, Input } from '@angular/core';

@Component({
  selector: 'safi-page-notification',
  templateUrl: './page-notification.component.html'
})
export class PageNotificationComponent {
  @Input() duration: number = 3000;
}
