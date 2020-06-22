import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SubMenuComponent } from './submenu.component';
import { RouterModule } from '@angular/router';
import { MenusService } from './menu.service';

@NgModule({
  declarations: [MenuComponent, SubMenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [MenuComponent, SubMenuComponent],
  providers: [MenusService]
})
export class MenuModule {}
