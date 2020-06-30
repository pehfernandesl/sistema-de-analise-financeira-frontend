import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './shared/auth/auth.service';
import { LocalStorageService } from './shared/local-storage/local-storage.service';
import { LoginService } from './login.service';
import { PageNotificationService } from '@components/page-notification/page-notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'safi-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  isLoading = false;

  loginForm = this.fb.group({
    email: ['', Validators.required],
    senha: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private pageNotificationService: PageNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.loginService.login(this.loginForm.value).subscribe(
      (resposta) => {
        if (resposta.token) {
          this.localStorageService.storeToken(resposta.token);
          this.localStorageService.storeActiveUserEmail(resposta.email);
          this.router.navigate(['']);
          this.isLoading = false;
        }
      },
      (erro) => {
        console.error(erro);
        this.pageNotificationService.addErrorMessage(
          'Não foi possível realizar o login.'
        );
        this.isLoading = false;
      }
    );

    this.isLoading = true;
  }

  public limpar(): void {
    this.loginForm.reset();
  }
}
