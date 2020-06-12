import { Component, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { PageNotificationService } from './../../page-notification/page-notification.service';

@Component({
  selector: 'safi-show-column',
  templateUrl: './show-column.component.html'
})
export class ShowColumn implements OnInit {

  @Input() columns: QueryList<any>;

  options: any[] = [];

  values: any[] = [];
  @Output() updateVisibleColumns: EventEmitter<any> = new EventEmitter();
  private lastValue: any[] = [];

  constructor(private pageNotificationService: PageNotificationService) {
  }

  ngOnInit() {
    this.columns.forEach((column) => {
      const col = { field: column.field, filterType: column.filterType, header: column.header };
      this.options.push(col);
      this.values.push(col);
      this.lastValue.push(col);
    });
  }

  mostrarColunas(event) {
    if (this.values.length) {
      this.lastValue = event.value;
      this.updateVisibleColumns.emit(this.values);
    } else {
      this.lastValue.map((item) => this.values.push(item));
      this.pageNotificationService.addErrorMessage('Não é possível exibir menos de uma coluna');
    }
  }
}
