import { Injectable } from '@angular/core';
import { DatatableService } from './datatable.service';
import { DatatableComponent } from './datatable.component';

import { DataProvider } from './dataprovider';
import { ServerDataProvider } from './server-dataprovider';
import { MemoryDataProvider } from './memory-dataprovider';

/**
 * Enum DataProviderType
 * @enum
 */
export enum DataProviderType {
  Memory = 'memory',
  Server = 'server'
}

/**
 * Class DataProviderFactory
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class DataProviderFactory {
  /**
   * constructor method
   * @constructor
   * @param {DatatableService} datatableService
   */
  constructor(private datatableService: DatatableService) {}

  /**
   * create method
   * @param {DataProviderType} type
   * @param {DatatableComponent} component
   * @public
   * @returns DataProvider
   */
  public create(
    type: DataProviderType,
    component: DatatableComponent
  ): DataProvider {
    if (DataProviderType.Server === type) {
      return new ServerDataProvider(this.datatableService, component);
    }

    if (DataProviderType.Memory === type) {
      return new MemoryDataProvider(component);
    }
  }
}
