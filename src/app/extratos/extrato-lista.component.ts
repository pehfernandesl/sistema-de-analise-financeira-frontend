import { environment } from './../../environments/environment';
import { ExtratoService } from './extrato.service';
import { Component, OnInit } from '@angular/core';
import { Extrato } from './extrato';

@Component({
  selector: 'safi-extrato-lista',
  templateUrl: './extrato-lista.component.html',
  styles: []
})
export class ExtratoListaComponent implements OnInit {
  public extratos: Extrato[];

  constructor(private extratoService: ExtratoService) {}

  ngOnInit(): void {
    this.refreshExtratos();
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
