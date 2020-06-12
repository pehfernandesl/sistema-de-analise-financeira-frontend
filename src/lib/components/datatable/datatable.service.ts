import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng';
import { HttpClient, HttpParams } from '@angular/common/http';

/**
 * Class DatatableService
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  /**
   * constructor method
   * @constructor
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * search method
   * @param {LazyLoadEvent} event
   * @param {String} url
   * @param {number} rows
   * @param {boolean} orderInSort
   * @param {any} query
   * @return Observable
   */
  search(event: LazyLoadEvent, url: string, rows: number, orderInSort: boolean, query?: any) {
    let page = 0;
    if (event !== undefined && event.first > 0) {
      page = Math.floor(event.first / rows);
    }

    let order = event.sortOrder === 1 ? 'asc' : 'desc';
    let params: HttpParams = new HttpParams()
      .set('page', page.toString())
      .set('size', rows.toString());

    if (orderInSort) {
      if (event.sortField !== undefined) {
        params = params.set('sort', event.sortField + ',' + order);
      }
    } else {
      if (event.sortField !== undefined) {
        params = params
          .set('sort', event.sortField)
          .set('order', order);
      }
    }

    if ('string' === typeof query) {
      params = params.set('query', query);
    }

    if ('object' === typeof query) {
      Object.keys(query).forEach(key => params = params.set(key, query[key]));
    }
    return this.http.get(`${url}?${params.toString()}`, { observe: 'response' });
  }
}
