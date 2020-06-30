import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DataProviderFactory, DataProviderType } from './dataprovider-factory';

import { Authorization } from '../../base/security/authentication/authorization/authorization';
import { Column } from './p-column.directive';
import { DataProvider } from './dataprovider';
import { Table as DataTable } from 'primeng/table';
import { DatatableButtonComponent } from './datatable-button.component';
import { DatatableClickEvent } from './datatable-click-event';
import { DatatablePaginationParameters } from './datatable-pagination-parameters';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'safi-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DatatableComponent
  implements AfterViewInit, AfterContentInit, OnInit {
  selectedRow: any;

  dataProvider: DataProvider;

  filterParams: any = {};

  footerMsg: string = '';

  orderInSort: boolean = false;

  @Input() splitButton: any;

  @Input() value: any[] = [];

  @Input() type: DataProviderType = DataProviderType.Server;

  @Input() rows: number = 5;

  @Input() rowsPerPageOptions: number[];

  @Input() url: string;

  @Input() extraParams: any;

  @Input() paginationParameters: DatatablePaginationParameters;

  @Input() showPaginationFooter = false;

  @Input() disableEdit = false;

  @Input() disableView = false;

  @Input() disableDelete = false;

  @Input() selectionMode = 'single';

  @Input() enableButtonsScroll = false;

  @Input() emptyMessage = 'Nenhum registro encontrado.';

  @Input() verticalButtons = true;

  @Input() enableScroll = false;

  @Input() scrollHeight: string;

  @Input() scrollWidth: string;

  @Input() rulesToHide: any;

  @Input() rulesToShowEdit: any;

  @Input() rulesToShowDelete: any;

  @Input() rulesToHideView: any;

  @Input() rulesToHideEdit: any;

  @Input() rulesToHideDelete: any;

  horizontalButtonsHeader: string;

  @Input() disableLoadingBlockUI = false;

  @Input() rowStyleClass: any;

  @Input() filterOnColumn = false;

  filterSelectOptions: any[] = [];

  updateFilterColumn: boolean = false;

  @Input() customFilterOptions: Object = {};

  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(DataTable, { static: true }) pDatatableComponent: DataTable;

  @ContentChildren(DatatableButtonComponent) extraButtons: QueryList<
    DatatableButtonComponent
  >;

  @ContentChildren(Column) columns: Column[];

  @Output() startedLoading: EventEmitter<void> = new EventEmitter<void>();

  @Output() finishedLoading: EventEmitter<HttpErrorResponse> = new EventEmitter<
    HttpErrorResponse
  >();

  @Output() onRowSelected: EventEmitter<any> = new EventEmitter<any>();

  showHorizontalButtonsHeader = false;

  blockContent = false;

  visibleColumns: Object = {};

  @Input() showVisibleColumnsControl: boolean = false;

  private errorMessage =
    'Ocorreu um erro ao carregar os dados da tabela. Tente novamente.';

  private originalEmptyMessage: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dataProviderFactory: DataProviderFactory,
    private authorizationService: Authorization
  ) {}

  ngOnInit() {
    this.dataProvider = this.dataProviderFactory.create(this.type, this);
    this.pDatatableComponent.rows = this.rows;
    this.subscribeToLoadingEvents();
    this.initRowsPerPageOptionsIfPresent();
    this.defineIfShouldShowHorizontalButtonsHeader();
    this.updateOnValueChange();

    this.finishedLoading.subscribe(() => {
      this.updateOnValueChange();
    });
  }

  ngAfterViewInit() {
    this.setExtraParams();
    this.pDatatableComponent.columns = this.columns;
    this.pDatatableComponent.ngAfterContentInit();
    this.setAllColumnsVisible();
    this.changeDetectorRef.detectChanges();
  }

  ngAfterContentInit() {
    this.extraButtons.forEach((button) => {
      button.click.subscribe((event) => {
        this.onClick(button.name, event);
      });
    });
  }

  onClick(button: string, event: any) {
    this.buttonClick.emit(new DatatableClickEvent(button, this.selectedRow));
    event.stopPropagation();
    this.resetSelectedRow(button);
  }

  onSelectChange(event: any) {
    this.onRowSelected.emit(this.selectedRow);
    if (Array.isArray(this.selectedRow) && this.selectedRow.length > 1) {
      this.updateMultipleButtonsStatus(true);
    } else {
      this.updateMultipleButtonsStatus(false);
    }
  }

  refresh(query?: any) {
    this.dataProvider.load(query);
  }

  resetSelectedRow(button: string) {
    if (button === 'delete') {
      this.selectedRow = null;
    }
  }

  reset() {
    this.pDatatableComponent.first = 0;
    this.dataProvider.reset();
    this.refresh();
  }

  paginationFooterText(msg: string): string {
    const registros = this.totalRecords() === 1 ? 'registro' : 'registros';
    if (msg === '') {
      return `Exibindo: ${this.currentFirstIndex()} a ${this.currentLastIndex()} de ${this.totalRecords()} ${registros}`;
    }
    msg = msg.replace('{totalRecords}', this.totalRecords().toString());
    msg = msg.replace(
      '{currentFirstIndex}',
      this.currentFirstIndex().toString()
    );
    msg = msg.replace('{currentLastIndex}', this.currentLastIndex().toString());
    return msg;
  }

  currentFirstIndex(): number {
    return this.pDatatableComponent.first + 1;
  }

  currentLastIndex(): number {
    const currentLastIndex: number =
      this.pDatatableComponent.first + this.pDatatableComponent.rows;
    if (currentLastIndex > this.totalRecords()) {
      return this.totalRecords();
    }
    return currentLastIndex;
  }

  totalRecords(): number {
    return this.pDatatableComponent.totalRecords;
  }

  checkRolesToButton(button: string): boolean {
    if (this[button]) {
      if (
        button === 'rulesToHide' ||
        button === 'rulesToShowEdit' ||
        button === 'rulesToShowDelete'
      ) {
        this.checkUseButtons(button);
        return this.authorizationService.hasRole(this[button]);
      }
      return !this.authorizationService.hasRole(this[button]);
    }
    return true;
  }

  checkUseButtons(button: string): void {
    if (this[button] && this[button.replace('Show', 'Hide')]) {
      throw new Error(
        'Não é possível definir dois valores de roles para os botões padrões.'
      );
    }
  }

  filter() {
    for (let prop in this.filterParams) {
      if (
        this.filterParams[prop] === '' ||
        this.filterParams[prop].length === 0
      ) {
        delete this.filterParams[prop];
      }
    }
    if (Object.getOwnPropertyNames(this.filterParams).length === 0) {
      this.reset();
    } else {
      this.refresh(this.filterParams);
    }
  }

  filterColumn(column: string, filters: any) {
    const values = [];
    if (filters instanceof Array) {
      values[column] = [];
      for (let item in filters) {
        let val =
          filters[item] instanceof Object ? filters[item].value : filters[item];
        values[column].push(val);
      }
    } else {
      values[column] = filters;
    }
    this.filterParams = { ...this.filterParams, ...values };

    return this.filter();
  }

  setAllColumnsVisible() {
    this.columns.forEach((col) => {
      this.visibleColumns[col.field] = 'table-cell';
    });
  }

  visibleColumnCheck(column: string, visibleColumns: []) {
    return visibleColumns.some((item: any) => {
      return item.field ? item.field == column : true;
    });
  }

  updateVisibleColumns(columns: []) {
    for (let col in this.visibleColumns) {
      if (this.visibleColumnCheck(col, columns)) {
        this.visibleColumns[col] = 'table-cell';
      } else {
        this.visibleColumns[col] = 'none';
      }
    }
  }

  private updateOnValueChange() {
    this.filterSelectOptions = [];
    if (this.value) {
      this.value.map((item: any) => {
        this.filterSelectOptions.push(item);
      });
    }
  }

  private subscribeToLoadingEvents() {
    if (!this.disableLoadingBlockUI) {
      this.originalEmptyMessage = this.emptyMessage;
      this.startedLoading.subscribe(() => this.onStartedLoading());
      this.finishedLoading.subscribe((error) => this.onFinishedLoading(error));
    }
  }

  private onStartedLoading() {
    this.blockContent = true;
    this.emptyMessage = this.originalEmptyMessage;
  }

  private onFinishedLoading(error: HttpErrorResponse) {
    this.blockContent = false;
    if (error) {
      this.emptyMessage = this.errorMessage;
    }
  }

  private initRowsPerPageOptionsIfPresent() {
    if (this.rowsPerPageOptions) {
      this.pDatatableComponent.rowsPerPageOptions = this.rowsPerPageOptions;
    }
  }

  private defineIfShouldShowHorizontalButtonsHeader() {
    if (this.horizontalButtonsHeader) {
      this.showHorizontalButtonsHeader = true;
    }
  }

  private setExtraParams() {
    for (let i in this.extraParams) {
      if (this.pDatatableComponent.hasOwnProperty(i)) {
        this.pDatatableComponent[i] = this.extraParams[i];
      }
    }
  }

  private updateMultipleButtonsStatus(hasMultipleSelection: boolean) {
    this.extraButtons.forEach((button) => {
      if (hasMultipleSelection && !button.allowMultipleSelection) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });
  }
}
