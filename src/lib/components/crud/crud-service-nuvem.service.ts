import { CrudService } from './crud-service.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

export class CrudServiceNuvem<I, E> implements CrudService<I, E> {

  constructor(public uri: string, protected http: HttpClient) {
  }

  save(entity: E): Observable<E> {
    return this.http.post<E>(this.uri, entity);
  }

  edit(entity: E): Observable<E> {
    return this.http.put<E>(this.uri, entity);
  }

  find(id: I): Observable<E> {
    return this.http.get<E>(`${this.uri}/${id}`);
  }

  delete(id: I): Observable<E> {
    return this.http.delete<E>(`${this.uri}/${id}`);
  }

  findAll(entity: E): Observable<E> {
    let params = new HttpParams();

    for (let field in entity) {
      params = params.append(field, <any> entity[field]);
    }

    return this.http.get<E>(`${this.uri}`, { params: params });
  }

}
