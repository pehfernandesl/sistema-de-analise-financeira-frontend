import { LazyLoadEvent } from 'primeng';
import { DatatableComponent } from './datatable.component';
import { DatatableService } from './datatable.service';
import { DataProvider } from './dataprovider';

/**
 * Class ServerDataProvider
 * @class
 */
export class ServerDataProvider implements DataProvider {
  /**
   * currentLazyLoadEvent property
   * @type {LazyLoadEvent}
   */
  currentLazyLoadEvent: LazyLoadEvent;

  /**
   * _query property
   * @type {any}
   */
  private _query: any;

  /**
   * constructor method
   * @constructor
   * @param {DatatableService} datatableService
   * @param {DatatableComponent} component
   */
  constructor(
    private datatableService: DatatableService,
    private component: DatatableComponent
  ) {
    this.component.pDatatableComponent.onLazyLoad.subscribe(
      (event: LazyLoadEvent) => this.onLazyLoad(event)
    );
    this.component.pDatatableComponent.lazy = true;
  }

  /**
   * onLazyLoad method
   * @param {LazyLoadEvent} onLazyLoad
   * @returns void
   */
  onLazyLoad(event: LazyLoadEvent) {
    this.currentLazyLoadEvent = event;
    this.load();
  }

  /**
   * load method
   * @param {any} query
   * @returns void
   */
  load(query?: any): void {
    query = this.retrieveAndSaveQuery(query);
    this.component.startedLoading.emit();
    this.datatableService
      .search(
        this.currentLazyLoadEvent,
        this.component.url,
        this.component.pDatatableComponent.rows,
        this.component.orderInSort,
        query
      )
      .toPromise()
      .then(
        (response) => {
          this.treatLoadResponse(response);
          this.component.finishedLoading.emit();
        },
        (error) => {
          this.component.finishedLoading.emit(error);
        }
      );
  }

  /**
   * reset method
   * @returns void
   */
  reset() {
    this._query = undefined;
  }

  /**
   * treatLoadResponse method
   * @param {any} response
   * @return void
   */
  private treatLoadResponse(response: any) {
    const data = response.body;
    if (this.component.paginationParameters) {
      this.treatLoadResponseWithPaginationParameters(data);
    } else {
      this.treatLoadResponseWithoutPaginationParameters(response, data);
    }
  }

  /**
   * treatLoadResponseWithPaginationParameters method
   * @param {any} data
   * @returns void
   */
  private treatLoadResponseWithPaginationParameters(data) {
    let contentIndex = this.component.paginationParameters.contentIndex;
    let totalIndex = this.component.paginationParameters.totalElementsIndex;
    this.component.value = data[contentIndex] ? data[contentIndex] : data;
    this.component.pDatatableComponent.totalRecords = data[totalIndex]
      ? data[totalIndex]
      : this.component.value.length;
  }

  /**
   * treatLoadResponseWithoutPaginationParameters method
   * @param {any} response
   * @param {any} data
   * @returns void
   */
  private treatLoadResponseWithoutPaginationParameters(response: any, data) {
    if (response.headers.has('x-total-count')) {
      this.component.pDatatableComponent.totalRecords = parseInt(
        response.headers.get('x-total-count'),
        10
      );
      this.component.value = data;
    } else {
      this.component.pDatatableComponent.totalRecords = data.totalElements;
      this.component.value = data.content;
    }
  }

  /**
   * retrieveAndSaveQuery method
   * @param {any} query
   * @returns any
   */
  private retrieveAndSaveQuery(query: any): any {
    const oldQuery = this._query;
    const currentQuery = this.doRetrieveAndSaveQuery(query);
    this.resetToFirstPageIfQueryChanged(oldQuery, currentQuery);
    return currentQuery;
  }

  /**
   * doRetrieveAndSaveQuery method
   * @param {any} query
   * @returns any
   */
  private doRetrieveAndSaveQuery(query: any): any {
    if ('object' === typeof query && query.value) {
      this._query = query.value;
    } else if (query) {
      this._query = query;
    }
    return this._query;
  }

  /**
   * resetToFirstPageIfQueryChanged method
   * @param {any} oldQuery
   * @param {any} currentQuery
   * @returns void
   */
  private resetToFirstPageIfQueryChanged(oldQuery, currentQuery) {
    if (oldQuery !== currentQuery) {
      this.currentLazyLoadEvent.first = 0;
      this.component.pDatatableComponent.first = 0;
    }
  }
}
