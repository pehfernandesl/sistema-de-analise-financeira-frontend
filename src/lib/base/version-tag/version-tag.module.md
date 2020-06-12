# VersionTag

O componente VersionTag exibe o atributo `version` do arquivo `package.json` do sistema, com o intuito de informar o usuário a versão atual da aplicação. Inicialmente foi feito para ser utilizado no rodapé das aplicações conforme o exemplo a seguir.

## Módulo

Adicione o módulo ao `AppModule`, na seção de `imports`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// módulo do componente VersionTag
import { VersionTagModule } from '@nuvem/angular-base';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Importação do módulo
    VersionTagModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Exemplo

```html
  <div class="footer">
    <div class="card clearfix">
      <span class="footer-text-left">BASIS Tecnologia.</span>
      <app-version-tag cssClass="footer-text-left"></app-version-tag>
      <span class="footer-text-right">
        <span class="ui-icon ui-icon-copyright"></span>  
        <span>All Rights Reserved</span>
      </span>
    </div>
  </div>
```