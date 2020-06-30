import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

import { ClipboardService } from './clipboard.service';

@Directive({
  selector: '[clipboard]'
})
/**
 * Diretiva que expõe seletor para o uso do clipbord
 * @class
 */
export class ClipboardDirective {
  /**
   * clipboard variable
   * @type {string}
   */
  @Input()
  clipboard: string;

  /**
   * onClipboard variable
   * @type {EventEmitter<boolean>}
   */
  @Output()
  onClipboard: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * constructor method
   * @param {ClipboardService} service
   * @constructor
   */
  constructor(private service: ClipboardService) {}

  @HostListener('click')
  /**
   * copy method
   * @event click
   * @returns void
   */
  copy() {
    try {
      this.service.copy(this.clipboard);
      this.onClipboard.emit(true);
    } catch (e) {
      this.onClipboard.emit(false);
      throw e;
    }
  }
}
