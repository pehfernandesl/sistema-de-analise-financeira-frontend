import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, RouterModule],
  exports: [BreadcrumbComponent],
  providers: [BreadcrumbService]
})
export class BreadcrumbModule {}
