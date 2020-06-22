import { Despesa } from './despesa';
import { DespesaService } from './despesa.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'safi-despesa-lista',
  templateUrl: './despesa-lista.component.html'
})
export class DespesaListaComponent implements OnInit {
  public readonly api = `${environment.apiUrl}/despesas`;

  private despesas: Despesa[];

  constructor(private despesaService: DespesaService) {}

  ngOnInit(): void {
    this.refreshDespesas();
  }

  public refreshDespesas(): void {
    this.despesaService
      .getDespesas()
      .subscribe((despesas) => (this.despesas = despesas));
  }

  public getDespesas(): Despesa[] {
    return this.despesas;
  }
}
