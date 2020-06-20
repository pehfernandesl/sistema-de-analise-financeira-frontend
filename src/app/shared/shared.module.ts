import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatableModule } from '@components/datatable/datatable.module';
import { PRIMENG_IMPORTS } from '../primeng-imports';
import { LocalStorageService } from './local-storage/local-storage.service';

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
  ],
  providers: [LocalStorageService]
})
export class SharedModule {}
