import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'safi-datatable-splitbutton',
  templateUrl: 'datatable-splitbutton.component.html'
})
export class DatatableSplitbuttonComponent implements OnInit {
  /**
   * items property
   * @type {any[]}
   */
  @Input()
  items: any[];

  /**
   * label property
   * @type {string}
   */
  @Input()
  label: string;

  /**
   * class property
   * @type {string}
   */
  @Input()
  class: string;

  /**
   * icon property
   * @type {string}
   */
  @Input()
  icon: string;

  /**
   * method propety
   * @type {any}
   */
  @Input()
  method: any;

  /**
   * ngOnInit method
   * @returns void
   */
  ngOnInit() {}
}
