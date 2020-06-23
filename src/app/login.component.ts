import { LocalStorageService } from './shared/local-storage/local-storage.service';
import { AuthService } from './shared/auth/auth.service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'safi-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required,],
    senha: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
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
        }
      },
      (error) => {
      }
    );
  }

  public limpar(): void {
    this.loginForm.reset();
  }
}
