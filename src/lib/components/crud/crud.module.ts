import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './success-message-handler.interceptor';
import { HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextComponent } from './components/input-text/input-text.component';

import { CalendarModule } from 'primeng/calendar';
import { CalendarComponent } from './components/calendar/calendar.component';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { TextAreaComponent } from './components/text-area/text-area.component';

import { DropdownModule } from 'primeng/dropdown';
import { DropdownComponent } from './components/dropdown/dropdown.component';

import { FormNotificationModule } from '../form-notification/form-notification.module';
import { ButtonModule } from 'primeng/button';
import { FormComponent } from './components/form/form.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CrudListComponent } from './crud-list.component';

import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

import { CrudFormComponent } from './crud-form.component';

import { FieldComponent } from './components/field.component';

import { DatatableModule } from '../datatable/datatable.module';

import { RouterModule } from '@angular/router';

import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { AutoCompleteCustomComponent } from './components/auto-complete/auto-complete-custom.component';
import { AutoCompleteItem } from './components/auto-complete/auto-complete-item.component';
import { AutoCompleteMultipleComponent } from './components/auto-complete-multiple/auto-complete-multiple.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { AutoCompleteModule } from 'primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormNotificationModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    AutoCompleteModule,
    ButtonModule,
    DatatableModule,
    HttpClientModule,
    RouterModule,
    ConfirmDialogModule,
    DropdownModule,
    ScrollingModule
  ],
  declarations: [
    CalendarComponent,
    InputTextComponent,
    TextAreaComponent,
    FormComponent,
    AutoCompleteComponent,
    AutoCompleteMultipleComponent,
    CrudListComponent,
    CrudFormComponent,
    FieldComponent,
    ValidationMessageComponent,
    DropdownComponent,
    AutoCompleteItem,
    AutoCompleteCustomComponent
  ],
  exports: [
    CalendarComponent,
    InputTextComponent,
    TextAreaComponent,
    FormComponent,
    AutoCompleteComponent,
    AutoCompleteMultipleComponent,
    CrudListComponent,
    CrudFormComponent,
    FieldComponent,
    ValidationMessageComponent,
    DropdownComponent
  ],
  providers: [
    httpInterceptorProviders,
    ConfirmationService
  ]
})
export class CrudModule {
}
