import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private readonly resource = `${environment.apiUrl}/receitas`;

  constructor(private httpClient: HttpClient) {
  }

  public getReceitas(): Observable<any> {
    return this.httpClient.get<any>(this.resource, { params: new HttpParams().set('sort', 'descricao') });
  }
}
