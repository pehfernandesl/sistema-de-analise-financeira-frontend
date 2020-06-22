import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatableModule } from '@components/datatable/datatable.module';
import { PRIMENG_IMPORTS } from '../primeng-imports';
import { AuthService } from './auth/auth.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthInterceptorProvider } from '../interceptors/auth.interceptor';

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
  providers: [LocalStorageService, AuthService, AuthInterceptorProvider]
})
export class SharedModule {}
