import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Relatorio } from './relatorio';

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
}
