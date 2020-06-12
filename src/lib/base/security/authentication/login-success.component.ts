import { Component, OnInit } from '@angular/core';
import { Authentication } from './authentication';
import { User } from './user';

/**
 * Componente de login que será chamado quando a aplicação for logada com sucesso. 
 * Deverá ser criada uma rota para esse componente.
 * @class
 */
@Component({
    selector: 'app-login-success',
    template: ''
})
export class LoginSuccessComponent implements OnInit {

  constructor(private authenticationService: Authentication<User>) { }

  ngOnInit(): void {
    this.authenticationService.login();
  }

}
