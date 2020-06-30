import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Relatorio } from './relatorio';
import { RelatorioService } from './relatorio.service';

@Component({
  selector: 'safi-relatorio',
  templateUrl: './relatorio-lista.component.html',
  styles: []
})
export class RelatorioListaComponent implements OnInit {
  public relatorio: Relatorio;
  public mes: string;

  constructor(
    private relatorioService: RelatorioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mes = this.route.snapshot.params.mes;
    this.refreshRelatorio();
  }

  public refreshRelatorio(): void {
    this.relatorioService.getRelatorio(this.mes).subscribe((relatorio) => {
      console.log(relatorio);
      this.relatorio = relatorio;
    });
  }

  public getRelatorio(): Relatorio {
    return this.relatorio;
  }
}
