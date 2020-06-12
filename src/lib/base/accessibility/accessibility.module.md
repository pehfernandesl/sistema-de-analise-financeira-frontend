# Accessibility

O módulo de acessibilidade contém funcionalidades para melhorar a aderência das aplicações aos padrões de acessibilidade. Contém uma folha de estilos e um serviço.

## Folha de estilos

Para incluir a folha de estilos globalmente na aplicação, edite o arquivo `angular.json` e inclua o arquivo dentro da coleção de `styles`.

```json
{
  //...
  "apps": [
    {
        // ...
        "styles": [
            //...
            "../node_modules/@nuvem/angular-base/accessibility/accessibility.scss"
        ]
        // ...
    }
  ]
}
```

## Módulo

Adicione o módulo ao `AccessibilityModule` na seção de `imports`:

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
// módulo de acessibilidade
import { AccessibilityModule } from "@nuvem/angular-base";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // Importação do módulo
    AccessibilityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## AccessibilityService

O serviço `AccessibilityService` contém os métodos para habilitar, desabilitar e gerenciar as configurações de acessibilidade.

| Assinatura                  | Descrição                           |
| --------------------------- | ----------------------------------- |
| enableHighContrast(): void  | Habilita o modo de alto contraste.  |
| disableHighContrast(): void | Desabilita o modo de alto contraste |
| increaseFontSize(): void    | Aumenta o tamanho da fonte.         |
| decreaseFontSize(): void    | Diminui o tamanho da fonte.         |
