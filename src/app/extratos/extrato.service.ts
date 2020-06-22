import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Extrato } from './extrato';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  constructor(private http: HttpClient) { }
  private url = `${environment.apiUrl}/informacoes-bancarias`;

  public salvar(extrato: Extrato): Observable<Extrato> {
    return this.http.post<Extrato>(this.url, extrato);
  }

  public getExtratos(): Observable<Extrato[]>{
    return this.http.get<Extrato[]>(this.url);
  }

}
