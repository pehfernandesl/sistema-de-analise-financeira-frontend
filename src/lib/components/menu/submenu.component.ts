/* tslint:disable: component-selector */
import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MenuItem } from 'primeng';
import { MenusService } from './menu.service';

@Component({
  selector: '[submenu]',
  templateUrl: './submenu.component.html',
  animations: [
    trigger('children', [
      state('hiddenAnimated', style({
        height: '0px'
      })),
      state('visibleAnimated', style({
        height: '*'
      })),
      state('visible', style({
        height: '*',
        'z-index': 100
      })),
      state('hidden', style({
        height: '0px',
        'z-index': '*'
      })),
      transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class SubMenuComponent {

  @Input() item: MenuItem;

  @Input() root: boolean;

  @Input() visible: boolean;

  _reset: boolean;

  _parentActive: boolean;

  activeIndex: number;

  constructor(public menuService: MenusService) {
  }

  /**
   * Alterar o menu root entre aberto e fechado
   */
  private rootMenuToggle() {
    if (this.root) {
      this.menuService.menuHoverActive = !this.menuService.menuHoverActive;
    }
  }

  /**
   * Activa o menu por index e desativa o item ativo
   * @param index
   */
  private activeMenuByIndex(index: number) {
    this.activeIndex = (this.activeIndex === index) ? null : index;
    return this.activeIndex;
  }

  /**
   * Verifica se foi informado um comando para o item de menu e executa caso necessário
   * @param item menu
   */
  private execCommand(event: Event, item: MenuItem) {
    if (item.command) {
      item.command({ 'originalEvent': event, 'item': item });
      return true;
    }
    return false;
  }

  /**
   * Esconte o menu caso este não possua itens
   * @param item menu
   */
  private hideMenu(item: MenuItem) {
    if (!item.items) {
      if (this.menuService.isHorizontal() || this.menuService.isSlim()) {
        this.menuService.resetMenu = true;
      } else {
        this.menuService.resetMenu = false;
      }

      this.menuService.overlayMenuActive = false;
      this.menuService.staticMenuMobileActive = false;
      this.menuService.menuHoverActive = !this.menuService.menuHoverActive;

      return true;
    }

    return false;
  }

  itemClick(event: Event, item: MenuItem, index: number) {

    this.rootMenuToggle();

    if (item.disabled) {
      event.preventDefault();
      return false;
    }

    this.activeMenuByIndex(index);
    this.execCommand(event, item);

    if (item.items || (!item.url && !item.routerLink)) {
      event.preventDefault();
    }

    this.hideMenu(item);

    return true;
  }

  onMouseEnter(index: number) {
    if (this.root && this.menuService.menuHoverActive && (this.menuService.isHorizontal() || this.menuService.isSlim())) {
      this.activeIndex = index;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  @Input() get reset(): boolean {
    return this._reset;
  }

  set reset(val: boolean) {
    this._reset = val;

    if (this._reset && (this.menuService.isHorizontal() || this.menuService.isSlim())) {
      this.activeIndex = null;
    }
  }

  @Input() get parentActive(): boolean {
    return this._parentActive;
  }

  set parentActive(val: boolean) {
    this._parentActive = val;

    if (!this._parentActive) {
      this.activeIndex = null;
    }
  }
}
