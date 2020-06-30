import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CRUD_SERVICE, CrudService } from './crud-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Column } from '../datatable/p-column.directive';
import { DatatableComponent } from '../datatable/datatable.component';
import { DatatableClickEvent } from '../datatable/datatable-click-event';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'nCrudList',
  templateUrl: './crud-list.component.html'
})
export class CrudListComponent implements OnInit, AfterContentInit {
  @Input() form: FormGroup;

  @Input() action: string = 'findAll';

  @Input() findLabel: string = 'Pesquisar';

  @Input() service: CrudService<any, any>;

  @Output() find: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('datatable', { static: true }) datatable: DatatableComponent;

  @ContentChildren(Column) columns: QueryList<Column>;

  result: any[];

  constructor(
    @Inject(CRUD_SERVICE)
    public crudService: CrudService<any, any>,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.service) {
      this.crudService = this.service;
    }
  }

  datatableClick(event: DatatableClickEvent) {
    if (event.selection) {
      switch (event.button) {
        case 'edit':
        case 'view':
          this.router.navigate([`../${event.button}`, event.selection.id], {
            relativeTo: this.route
          });
          break;
        case 'delete':
          this.confirmationService.confirm({
            message: 'Você tem certeza que deseja excluir o registro?',
            accept: () =>
              this.crudService
                .delete(event.selection.id)
                .subscribe(() => this.datatable.filter())
          });
          break;
      }
    }
  }

  findAll(event: any) {
    if (this.find.observers.length) {
      this.find.emit(this.form.value);
    } else {
      this.datatable.filterParams = {};
      Object.keys(this.form.value).forEach((element) => {
        let value = this.form.value[element];
        if (value) {
          this.datatable.filterParams[element] =
            value instanceof Date
              ? JSON.stringify(value).replace(/"/g, '')
              : value;
        }
      });
      this.datatable.filter();
    }
  }

  ngAfterContentInit() {
    const datatableNgAfterContentInit = this.datatable.pDatatableComponent
      .ngAfterContentInit;
    this.datatable.pDatatableComponent.ngAfterContentInit = () => {
      this.datatable.pDatatableComponent.columns = this.columns.toArray();
      datatableNgAfterContentInit.call(this.datatable.pDatatableComponent);
    };
  }
}
