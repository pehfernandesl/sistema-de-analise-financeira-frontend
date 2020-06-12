import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockUIModule, ButtonModule, PaginatorModule, ProgressSpinnerModule, SplitButtonModule, TooltipModule } from 'primeng';

import { TableModule } from 'primeng/table';

import { DataProviderFactory } from './dataprovider-factory';
import { DatatableComponent } from './datatable.component';
import { DatatableButtonComponent } from './datatable-button.component';
import { DatatableService } from './datatable.service';
import { DatatableSplitbuttonModule } from '../extra-button/datatable-splitbutton.module';
import { FilterColumnModule } from './filter-column/filter-column.module';
import { ShowColumnModule } from './show-column/show-column.module';
import { Column } from './p-column.directive';

/**
 * Class DatatableModule
 * @class
 */
@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    SplitButtonModule,
    TooltipModule,
    TableModule,
    BlockUIModule,
    ProgressSpinnerModule,
    DatatableSplitbuttonModule,
    HttpClientModule,
    PaginatorModule,
    FilterColumnModule,
    ShowColumnModule
  ],
  declarations: [
    DatatableComponent,
    DatatableButtonComponent,
    Column
  ],
  providers: [
    { provide: DatatableService, useClass: DatatableService, deps: [HttpClient] },
    DataProviderFactory
  ],
  exports: [
    DatatableComponent,
    DatatableButtonComponent,
    FilterColumnModule,
    ShowColumnModule,
    Column
  ]
})
export class DatatableModule {
}
