import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { PageNotificationService } from '@components/page-notification/page-notification.service';
import { Receita } from './receita';
import { ReceitaService } from './receita.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'safi-receita-lista',
  templateUrl: './receita-lista.component.html'
})
export class ReceitaListaComponent implements OnInit {
  public readonly api = `${environment.apiUrl}/receitas`;
  private receitas: any[];

  constructor(
    private receitaService: ReceitaService,
    private pageNotificationService: PageNotificationService
  ) {}

  ngOnInit(): void {
    this.refreshReceitas();
  }

  public onDatabaseButtonClick(event: {
    button: string;
    selection: Receita;
  }): void {
    this.receitaService.delete(event.selection).subscribe(
      (resposta) => {
        this.pageNotificationService.addDeleteMsg('O Registro foi excluído');
        this.refreshReceitas();
      },
      (erro: HttpErrorResponse) => {
        this.pageNotificationService.addErrorMessage(erro.message);
      }
    );
  }

  public refreshReceitas(): void {
    this.receitaService.getReceitas().subscribe((receitas) => {
      this.receitas = receitas;
    });
  }

  public getReceitas(): any[] {
    return this.receitas;
  }
}
