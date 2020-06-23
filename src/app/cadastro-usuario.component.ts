import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CALENDAR_LOCALE } from '@components/crud/components/calendar/calendar-locale';
import { LocaleSettings } from 'primeng';
import { PageNotificationComponent } from '@components/page-notification/page-notification.component';
import { PageNotificationService } from '@components/page-notification/page-notification.service';
import { Router } from '@angular/router';
import { SafiErrorHttpResponse } from './err/error-httpresponse';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'safi-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html'
})
export class CadastroUsuarioComponent implements OnInit {
  public calendarLocale: LocaleSettings = CALENDAR_LOCALE;
  private readonly api = `${environment.apiUrl}/usuarios`;

  public cadastroForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    senha: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private pageNotificationService: PageNotificationService
  ) {}

  ngOnInit(): void {}

  public cadastrar(): void {
    this.http.post(this.api, this.cadastroForm.value).subscribe(
      (sucesso) => {
        this.pageNotificationService.addSuccessMessage(
          'Sua conta foi cadastrada com sucesso!'
        );
        this.router.navigate(['']);
      },
      ({ error }: HttpErrorResponse) => {
        console.log(error);

        const errors = error.errors as Array<any>;

        errors.forEach((err) => {
          this.pageNotificationService.addErrorMessage(
            err.defaultMessage,
            err.field
          );
        });
      }
    );
  }

  public limpar(): void {
    this.cadastroForm.reset();
  }
}
