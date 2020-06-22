import { Component, OnInit, Output } from '@angular/core';
import { Despesa } from './despesa';

@Component({
  selector: 'safi-despesa',
  template: ``
})
export class DespesaComponent implements OnInit {
  @Output() public despesa: Despesa = {};

  constructor() {}

  ngOnInit(): void {}
}
