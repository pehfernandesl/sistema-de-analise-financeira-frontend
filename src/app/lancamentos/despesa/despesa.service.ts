import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Despesa } from './despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  public readonly api = `${environment.apiUrl}/despesas`;

  constructor(private httpClient: HttpClient) {}

  public getDespesas(): Observable<Despesa[]> {
    return this.httpClient.get<Despesa[]>(this.api, {
      params: new HttpParams().set('sort', 'id')
    });
  }

  public create(despesa: Despesa): Observable<Despesa> {
    return this.httpClient.post<Despesa>(this.api, despesa);
  }
}
