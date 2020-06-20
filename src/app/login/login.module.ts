import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng';
import { RouterModule } from '@angular/router';

import { routes } from './login.routes';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [LoginComponent]
})
export class LoginModule {}
