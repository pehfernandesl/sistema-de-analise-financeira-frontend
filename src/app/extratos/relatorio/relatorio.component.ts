import { CALENDAR_LOCALE } from './../../../lib/components/crud/components/calendar/calendar-locale';
import { Component, OnInit } from '@angular/core';

import { RelatorioService } from './relatorio.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocaleSettings } from 'primeng';

@Component({
  selector: 'safi-relatorio',
  template: `
    <div class="ui-g ui-fluid">
  <form [formGroup]="relatorioForm">
    <div class="ui-g-12">
      <div>
        <h1>Relatório Mensal</h1>
      </div>
      <div class="ui-g-12">
          <span class="ui-float-label">
            <p-calendar
              [locale]="calendarLocale"
              formControlName="mes"
            ></p-calendar>
            <label>Escolha o mês</label>
          </span>
      </div >
      <div class="ui-g-6">
        <button
          pButton
          icon="ui-icon-search"
          label="Buscar"
          [disabled]="relatorioForm.invalid"
          (click)="buscar()"
        ></button>
      </div>
    </div>
  </form>
</div>
  `,
  styles: []
})
export class RelatorioComponent implements OnInit {
  public calendarLocale: LocaleSettings = CALENDAR_LOCALE;


  public relatorioForm = this.fb.group({
    mes: [null, Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private relatorioService: RelatorioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public buscar(){
    const dataMes: Date = this.relatorioForm.controls.mes.value;
    this.router.navigate(['relatorios/show', {dataMes}] );
  }
}
