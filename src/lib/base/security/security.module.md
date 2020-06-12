# Security

O modulo de segurança contem funcionalidades para autenticação, autorização, redirecionamento para login, gerenciamento de tokens JWT e obtenção e armazenamento de dados de usuário.  

## Modulo

Para utilização do modulo as seguintes configurações devem ser realizadas no arquivo __app.module.ts__:

```typescript
import { SecurityModule } from '@nuvem/angular-base';

import { environment } from './../environments/environment';

@NgModule({
    imports: [
        SecurityModule.forRoot(environment.auth)
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

Configurações a serem realizadas no arquivo __environment.ts__

```typescript
export const environment = {
  auth: {
    baseUrl: '',
    loginUrl: '/api/sso/login',
    loginSuccessRoute: '/#/login-success'
    logoutUrl: '/api/logout',
    detailsUrl: '/api/user/details',
    storage: localStorage,
    userStorageIndex: 'user',
  }
};
```

Caso não esteja usando cookies:

```typescript
export const environment = {
  auth: {
    baseUrl: '',
    loginUrl: '/api/sso/login',
    loginSuccessRoute: '/#/login-success'
    logoutUrl: '/api/logout',
    detailsUrl: '/api/user/details',
    storage: localStorage,
    userStorageIndex: 'user',
    tokenStorageIndex: 'token',
  }
};
```

### Guard

Guard que verifica se usuário está autenticado antes do usuário acessar uma rota. Se for verificar que o usuário não está autenticado, é feito um redirecionamento para o login.

Exemplo:

__src/app/app.routes.ts__

```typescript
import { Routes } from '@angular/router';
import { AuthGuard } from '@nuvem/angular-base';

import { DiarioErrosComponent } from './diario-erros.component';

export const routes: Routes = [
  { path: 'diario-erros', component: DiarioErrosComponent, canActivate: [AuthGuard] }
];
```

### Diretiva

A diretiva `hasRole` pode ser utilizada em qualquer elemento/componente da interface. Baseado no usuário autenticado, ela vai exibir ou remover o elemento de acordo com as permissões do usuário autenticado.

O único parâmetro que a diretiva recebe é a permissão necessária para renderizar o elemento. Pode ser passado `string` ou `string[]`.

Por ser uma diretiva estrutural, deve ser prefixado um asterísco `*` antes da mesma.

```html
<div *hasRole="'ADMIN'">
  <button type="button" label="Cadastrar"></button>
</div>
```

No caso de várias permissões terem acesso.

```html
<div *hasRole="['ADMIN', 'SUPERVISOR']">
  <button type="button" label="Cadastrar"></button>
</div>
```

### Hide While Login

O componente Hide While Login tem o propósito de esconder elementos da interface enquanto não existe usuário autenticado. Especialmente útil quando a aplicação efetua autenticação em um sistema externo, por meio de redirecionamento, evitando que o layout seja exibido para o usuário antes da autenticação.

Em um projeto padrão `angular-cli`, essa diretiva é aplicada no arquivo `app.component.html`.

A utilização desse componente é semelhante ao modo como as diretivas são aplicadas.

```html
<div hide-while-login></div>
```

#### Parâmetros

Por padrão, o componente assume nenhuma mensagem padrão para exibir quando o layout for ocultado na view. Se necessário alterar esses parâmetros, deve-se usar o parâmetro `loadingContent`:

```html
<div hide-while-login loadingContent="Nova mensagem"></div>
```
