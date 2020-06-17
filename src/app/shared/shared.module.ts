import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PRIMENG_IMPORTS } from '../primeng-imports';
import { DatatableModule } from '@components/datatable/datatable.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DatatableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PRIMENG_IMPORTS
  ],
  exports: [
    FormsModule,
    DatatableModule,
    ReactiveFormsModule,
    HttpClientModule,
    PRIMENG_IMPORTS
  ]
})
export class SharedModule {
}
