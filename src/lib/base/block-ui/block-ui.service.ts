import { BlockUiStatus } from './block-ui.status';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Class BlockUiService
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class BlockUiService {
  /**
   * subject property
   * @private
   * @type {Subject<BlockUiStatus>}
   */
  private subject = new Subject<BlockUiStatus>();

  /**
   * loaderStatus property
   * @public
   * @type {Observable}
   */
  loaderStatus = this.subject.asObservable();

  /**
   * constructor method
   * @constructor
   */
  constructor() {}

  /**
   * show methods
   * @returns void
   */
  show() {
    this.subject.next(<BlockUiStatus>{ status: true });
  }

  /**
   * hide methods
   * @returns void
   */
  hide() {
    this.subject.next(<BlockUiStatus>{ status: false });
  }
}
