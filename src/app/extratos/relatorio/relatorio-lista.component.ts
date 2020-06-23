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

  constructor( private relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.refreshRelatorio();
  }

  public refreshRelatorio(): void {
    this.relatorioService.getRelatorio().subscribe(
      relatorio => {
        console.log(relatorio);
        this.relatorio = relatorio;
      });
  }

  public getRelatorio(): Relatorio {
    return this.relatorio;
  }
}
