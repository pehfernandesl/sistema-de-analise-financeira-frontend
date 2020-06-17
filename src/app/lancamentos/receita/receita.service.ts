import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  constructor(private httpClient: HttpClient) {}
}
