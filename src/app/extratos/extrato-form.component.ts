import { PageNotificationService } from '@components/page-notification/page-notification.service';
import { ExtratoService } from './extrato.service';
import { CALENDAR_LOCALE } from '@components/crud/components/calendar/calendar-locale';
import { LocaleSettings } from 'primeng';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'safi-extrato-form',
  templateUrl: './extrato-form.component.html',
  styles: []
})
export class ExtratoFormComponent implements OnInit {
  public calendarLocale: LocaleSettings = CALENDAR_LOCALE;

  public extratoForm = this.fb.group({
    id: this.fb.group({
      tpBanco: [null, Validators.required],
      mesAno: [null, Validators.required]
    }),
    arquivoBase64: ['', ]
  });
  constructor(
    private fb: FormBuilder,
    private extratoService: ExtratoService,
    private pageNotificationService: PageNotificationService
  ) {}

  ngOnInit(): void {}

  public salvar(): void {
    this.extratoService.salvar(this.extratoForm.value).subscribe(resposta =>{
      console.log('Ok');
    });
  }
}
