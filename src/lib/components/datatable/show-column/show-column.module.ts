import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule, InputTextModule, MultiSelectModule } from 'primeng';

import { ShowColumn } from './show-column.component';

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
    ShowColumn
  ],
  exports: [
    ShowColumn
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShowColumnModule {
}
