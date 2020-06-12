# Block UI

O componente Block UI bloqueia a tela enquanto um request dos tipos POST, PUT, PATCH ou DELETE está em andamento.

Internamente, o componente intercepta os eventos emitidos pelo `HttpClient` e dispara o start para o componente.

## Módulo

Adicione os módulos `BlockUiModule` ao `AppModule`, na seção de `imports`:

```typescript
import { BlockUiModule } from '@nuvem/primeng-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    BlockUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Componente

Insira o componente no template padrão da aplicação.

app.component.html

```html
<basis-block-ui></basis-block-ui>
```