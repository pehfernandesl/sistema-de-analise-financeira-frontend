import { Component, OnInit } from '@angular/core';

import { Relatorio } from './relatorio';
import { RelatorioService } from './relatorio.service';

@Component({
  selector: 'safi-relatorio',
  templateUrl: './relatorio.component.html',
  styles: []
})
export class RelatorioComponent implements OnInit {
  public relatorio: Relatorio;

  public relatorios: Relatorio[];

  constructor( private relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.refreshRelatorio();
  }

  public refreshRelatorio(): void {
    this.relatorioService.getRelatorio().subscribe(
      relatorio => {
        console.log(relatorio);
        // this.relatorios = [relatorio];
        this.relatorio = relatorio;
      });
  }

  public getRelatorio(): Relatorio {
    return this.relatorio;
  }
}
