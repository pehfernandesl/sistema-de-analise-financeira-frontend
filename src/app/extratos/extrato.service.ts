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

  public salvar(extrato: Extrato): Observable<Extrato> {
    const url = `${environment.apiUrl}/extratos`;
    return this.http.post<Extrato>(url, extrato);
  };

}
