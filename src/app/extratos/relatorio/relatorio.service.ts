import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Relatorio } from './relatorio';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) { }

  public getRelatorio(): Observable<Relatorio> {
    return this.http.get <Relatorio>(`${environment.apiUrl}/relatorios?mes=7`);
  }
}
