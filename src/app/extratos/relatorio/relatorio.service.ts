import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Relatorio } from './relatorio';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  constructor(private http: HttpClient) {}

  public getRelatorio(mes: string): Observable<Relatorio> {
    return this.http.get<Relatorio>(`${environment.apiUrl}/relatorios`, {
      params: new HttpParams().set('mes', mes)
    });
  }

  public getTransacoesForChart(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/transacoes`);
  }
}
