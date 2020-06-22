import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'safi-filter-column',
  templateUrl: './filter-column.component.html'
})
export class FilterColumn implements OnChanges, OnInit {
  @Input() listaOriginal: any[] = [];

  @Input() lista: any[] = [];

  @Input() field: string;

  @Input() header: string;

  @Input() labelDefaultImplementation: boolean = false;

  @Input() labelDefaultName: string;

  @Input() updateFiltro: boolean = false;

  @Input() filterType: string;

  @Input() tableType: string;

  @Input() customFilterOptions: Object = {};

  @Input() template = 'filter_text';

  @Output() outputEvent = new EventEmitter();
  filtro: any;
  resultado: any[] = [];
  private debouncer: Subject<any> = new Subject<any>();
  private listaFields: any[] = [];

  constructor() {}

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(this.tableType === 'memory' ? 300 : 1000))
      .subscribe((value) => this.outputEvent.emit(value));

    this.template = `filter_${this.filterType}`;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (this.checkChanges(changes, 'listaOriginal')) {
      this.preencherFields();
    }
  }

  checkChanges(changes: { [propName: string]: SimpleChange }, property) {
    return (
      changes[property] &&
      changes[property].previousValue != changes[property].currentValue
    );
  }

  filtrar(event) {
    this.debouncer.next(this.filtro);
  }

  preencherFields() {
    this.listaFields = [];
    this.listaOriginal
      .filter((pi) => pi[this.field] !== null)
      .forEach((row) => {
        let item = { label: row[this.field], value: row[this.field] };
        if (!this.verificarSeExisteField(item)) {
          this.listaFields.push(item);
        }
      });
  }

  verificarSeExisteField(field) {
    return this.listaFields.some((item) => {
      return item.value == field.value;
    });
  }

  getCustomFilterOptions() {
    if (this.customFilterOptions.hasOwnProperty(this.field)) {
      return this.customFilterOptions[this.field];
    }

    return this.listaFields;
  }
}
