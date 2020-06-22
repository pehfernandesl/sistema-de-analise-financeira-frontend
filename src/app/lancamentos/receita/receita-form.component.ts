import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CALENDAR_LOCALE } from '@components/crud/components/calendar/calendar-locale';
import { LocaleSettings } from 'primeng';
import { ReceitaService } from './receita.service';
import { PageNotificationService } from '@components/page-notification/page-notification.service';

@Component({
  selector: 'safi-receita-form',
  template: `<div class="ui-g ui-fluid">
    <form [formGroup]="receitaForm">
      <div class="ui-g-12">
        <div>
          <h1>Lançar Nova Receita</h1>
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
            [disabled]="receitaForm.invalid"
            (click)="salvar()"
          ></button>
        </div>
      </div>
    </form>
  </div>`,
  styles: [
    `
      span,
      div {
        margin: 5px;
      }
    `
  ]
})
export class ReceitaFormComponent implements OnInit {
  public calendarLocale: LocaleSettings = CALENDAR_LOCALE;

  public receitaForm = this.fb.group({
    descricao: [null, Validators.required],
    valor: [null, Validators.required],
    dataLancamento: [null]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private receitaService: ReceitaService,
    private pageNotificationService: PageNotificationService
  ) {}

  ngOnInit(): void {}

  public salvar(): void {
    this.receitaService.create(this.receitaForm.value).subscribe((resposta) => {
      this.pageNotificationService.addCreateMsg(
        'A Receita foi salva com sucesso!'
      );

      this.router.navigate(['/receitas']);
    });
  }
}
