import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CALENDAR_LOCALE } from '@components/crud/components/calendar/calendar-locale';
import { Despesa } from './despesa';
import { DespesaService } from './despesa.service';
import { LocaleSettings } from 'primeng';
import { PageNotificationService } from '@components/page-notification/page-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'safi-despesa-form',
  templateUrl: './despesa-form.component.html',
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
