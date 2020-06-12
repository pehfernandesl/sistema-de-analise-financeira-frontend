# Clipboard

A diretiva Clipboard permite copiar textos para a área de transferência do Sistema Operacional a partir do evento `click` de um botão. Disponível por meio do seletor `[clipboard]`.

Utiliza internamente o `document.execCommand('copy')`.

Diretiva inspirada no [Clipboard.js](https://clipboardjs.com/).

## Módulo

Adicione o módulo `ClipboardModule`, na seção de `imports`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// módulo da diretiva
import { ClipboardModule } from '@nuvem/angular-base';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Importação do módulo
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Exemplo

```html
<button type="button" [clipboard]="text" (onClipboard)="onCopy($event)">Copiar</button>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  public text: string = 'angular rocks!';

  onCopy(status: boolean) {
    console.log(status);
  }
}
```

## Outputs

| Output | Tipo | Descrição |
|-------------|---------|-------------------------------------------------------------------------|
| onClipboard | boolean | notifica se um texto é copiado para a área de transferência com sucesso |