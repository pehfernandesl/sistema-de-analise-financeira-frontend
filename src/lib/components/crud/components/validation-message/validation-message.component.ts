import { Component, Input } from '@angular/core';

@Component({
  selector: 'nValidationMessage',
  templateUrl: './validation-message.component.html'
})
export class ValidationMessageComponent {
  @Input() control: any;
}
