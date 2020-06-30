import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CALENDAR_LOCALE } from '@components/crud/components/calendar/calendar-locale';
import { LocaleSettings } from 'primeng';
import { PageNotificationService } from '@components/page-notification/page-notification.service';
import { ReceitaService } from './receita.service';
import { Router } from '@angular/router';

@Component({
  selector: 'safi-receita-form',
  templateUrl: './receita-form.component.html',
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
