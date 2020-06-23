import { Component, OnInit } from '@angular/core';

import { Despesa } from './despesa';
import { DespesaService } from './despesa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PageNotificationService } from '@components/page-notification/page-notification.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'safi-despesa-lista',
  templateUrl: './despesa-lista.component.html'
})
export class DespesaListaComponent implements OnInit {
  public readonly api = `${environment.apiUrl}/despesas`;

  private despesas: Despesa[];

  constructor(
    private despesaService: DespesaService,
    private pageNotificationService: PageNotificationService
  ) {}

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

  public onDatabaseButtonClick(event: {
    button: string;
    selection: Despesa;
  }): void {
    this.despesaService.delete(event.selection).subscribe(
      (resposta) => {
        this.pageNotificationService.addDeleteMsg('O Registro foi excluído');
        this.refreshDespesas();
      },
      (erro: HttpErrorResponse) => {
        this.pageNotificationService.addErrorMessage(erro.message);
      }
    );
  }
}
