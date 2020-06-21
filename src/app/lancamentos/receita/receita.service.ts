import { Receita } from './receita';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  public readonly api = `${environment.apiUrl}/receitas`;

  constructor(private httpClient: HttpClient) {}

  public getReceitas(): Observable<Receita[]> {
    return this.httpClient.get<Receita[]>(this.api, {
      params: new HttpParams().set('sort', 'id')
    });
  }

  public create(receita: Receita): Observable<Receita> {
    return this.httpClient.post<Receita>(this.api, receita);
  }
}
