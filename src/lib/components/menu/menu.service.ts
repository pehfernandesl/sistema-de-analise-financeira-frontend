import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng';

export enum MenuOrientation {
  STATIC,
  OVERLAY,
  SLIM,
  HORIZONTAL
}

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  layoutMode: MenuOrientation = MenuOrientation.STATIC;

  menuHoverActive: boolean;

  itens: MenuItem[] = [];

  resetMenu: boolean;

  isMobile: boolean;

  isTablet: boolean;

  isDesktop: boolean;

  overlayMenuActive: boolean;

  staticMenuMobileActive: boolean;

  staticMenuDesktopInactive: boolean;

  isOverlay() {
    return this.layoutMode === MenuOrientation.OVERLAY;
  }

  isHorizontal() {
    return this.layoutMode === MenuOrientation.HORIZONTAL;
  }

  isSlim() {
    return this.layoutMode === MenuOrientation.SLIM;
  }

  changeToStaticMenu() {
    this.layoutMode = MenuOrientation.STATIC;
  }

  changeToOverlayMenu() {
    this.layoutMode = MenuOrientation.OVERLAY;
  }

  changeToHorizontalMenu() {
    this.layoutMode = MenuOrientation.HORIZONTAL;
  }

  changeToSlimMenu() {
    this.layoutMode = MenuOrientation.SLIM;
  }

}
