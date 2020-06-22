import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const CRUD_SERVICE = new InjectionToken<CrudService<any, any>>(
  'CRUD_SERVICE'
);

export interface CrudService<I, E> {
  uri: string;

  save(entidade: E): Observable<E>;

  edit(entidade: E): Observable<E>;

  find(id: I): Observable<E>;

  delete(id: I): Observable<E>;

  findAll(entidade: E): Observable<E>;
}
