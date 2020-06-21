import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CALENDAR_LOCALE } from '@components/crud/components/calendar/calendar-locale';
import { LocaleSettings } from 'primeng';
import { Despesa } from './despesa';
import { DespesaService } from './despesa.service';
import { Router } from '@angular/router';
import { PageNotificationService } from '@components/page-notification/page-notification.service';

@Component({
  selector: 'safi-despesa-form',
  template: `
    <div class="ui-g ui-fluid">
      <form [formGroup]="despesaForm">
        <div class="ui-g-12">
          <div>
            <h1>Lançar Nova Despesa</h1>
          </div>
          <div class="ui-g-12">
            <span class="ui-float-label">
              <input pInputText formControlName="descricao" />
              <label>Descrição</label>
            </span>
          </div>
          <div class="ui-g-12">
            <label>Valor</label>
            <p-inputNumber
              formControlName="valor"
              mode="currency"
              currency="BRL"
              locale="pt-BR"
            ></p-inputNumber>
          </div>
          <div class="ui-g-12">
            <span class="ui-float-label">
              <p-calendar
                [locale]="calendarLocale"
                formControlName="dataLancamento"
              ></p-calendar>
              <label>Data de Lançamento</label>
            </span>
          </div>
          <div class="ui-g-4">
            <button
              pButton
              icon="ui-icon-add"
              label="Salvar"
              [disabled]="despesaForm.invalid"
              (click)="salvar()"
            ></button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      span,
      div {
        margin: 5px;
      }
    `
  ]
})
export class DespesaFormComponent implements OnInit {
  public calendarLocale: LocaleSettings = CALENDAR_LOCALE;

  public despesaForm = this.fb.group({
    descricao: [null, Validators.required],
    valor: [null, Validators.required],
    dataLancamento: [null]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private despesaService: DespesaService,
    private pageNotificationService: PageNotificationService
  ) {}

  ngOnInit(): void {}

  public salvar(): void {
    this.despesaService
      .create(this.normalizeDespesa(this.despesaForm.value))
      .subscribe((resposta) => {
        this.pageNotificationService.addCreateMsg(
          'A Despesa foi salva com sucesso!'
        );

        this.router.navigate(['/despesas']);
      });
  }

  private normalizeDespesa({ dataLancamento, valor, descricao }): Despesa {
    return {
      descricao,
      valor: valor * -1,
      dataLancamento
    };
  }
}
