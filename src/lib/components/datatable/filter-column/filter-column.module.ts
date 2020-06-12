import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule, InputTextModule, MultiSelectModule } from 'primeng';

import { FilterColumn } from './filter-column.component';

@NgModule({
  imports: [
    CommonModule,
    MultiSelectModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  declarations: [
    FilterColumn
  ],
  exports: [
    FilterColumn
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilterColumnModule {
}
