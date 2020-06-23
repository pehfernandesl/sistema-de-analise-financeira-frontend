import { Component, OnInit } from '@angular/core';

import { Extrato } from './extrato';
import { ExtratoService } from './extrato.service';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

@Component({
  selector: 'safi-extrato-lista',
  templateUrl: './extrato-lista.component.html',
  styles: []
})
export class ExtratoListaComponent implements OnInit {
  public extratos: Extrato[];

  constructor(private extratoService: ExtratoService, private router: Router) {}

  ngOnInit(): void {
    this.refreshExtratos();
  }

  public onDatabaseButtonClick(event: {
    button: string;
    selection: any;
  }): void {
    const mesAno = event.selection.id.mesAno as string;
    const ano = mesAno.split('-')[0];
    const mes = mesAno.split('-')[1];
    this.router.navigate([`relatorios/show/${mes}.${ano}`]);
  }

  public refreshExtratos(): void {
    this.extratoService
      .getExtratos()
      .subscribe((extratos) => (this.extratos = extratos));
  }

  public getExtratos(): Extrato[] {
    return this.extratos;
  }
}
