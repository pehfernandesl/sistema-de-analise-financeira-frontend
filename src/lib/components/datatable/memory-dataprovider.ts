import { DataProvider } from './dataprovider';
import { DatatableComponent } from './datatable.component';

/**
 * Class MemoryDataProvider
 * @class
 */
export class MemoryDataProvider implements DataProvider {
  /**
   * constructor method
   * @param {DatatableComponent} component
   * @constructor
   */
  constructor(private component: DatatableComponent) {}

  /**
   * load method
   * @param {any} query
   * @returns void
   */
  load(query?: any): void {
    this.component.pDatatableComponent.reset();

    for (let prop in query) {
      let matchMode = 'contains';
      if (query[prop] instanceof Array) {
        matchMode = 'in';
      }
      this.component.pDatatableComponent.filter(query[prop], prop, matchMode);
    }

    this.component.pDatatableComponent.globalFilterFields = query;
    this.component.pDatatableComponent._filter();
  }

  /**
   * reset method
   * @returns void
   */
  reset() {
    this.component.pDatatableComponent.globalFilterFields = undefined;
  }
}
