import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'safi-datatable-button',
  templateUrl: './datatable-button.component.html'
})
export class DatatableButtonComponent {

  @Input()
  icon: string;

  @Input()
  class: string;

  @Input()
  bTooltip: string;

  @Input()
  name: string;

  @Input()
  allowMultipleSelection = true;

  @Input()
  disabled = false;

  @Output()
  click: EventEmitter<any> = new EventEmitter<any>();

  onClick(event: any) {
    this.click.emit(event);
    event.stopPropagation();
  }
}
