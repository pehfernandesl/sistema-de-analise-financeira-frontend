import { Component } from '@angular/core';

import { MenusService } from './menu.service';

@Component({
  selector: 'safi-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  constructor(public menuService: MenusService) {}
}
