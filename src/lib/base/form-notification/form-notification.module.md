# Form Notification
Componente responsável por realizar a apresentação das notificações de validação provenientes do backend.

O formato esperado de retorno pode ser encontrado na biblioteca [zalando](https://github.com/zalando/problem)

## Componente
para a utilização do componente é nescessário a seguinte implementação no arquivo de modules do seu componente __myModule.module.ts__
inserir o seguinte  de código
```typescript
import {
    ...
    FormNotificationModule
} from '@nuvem/angular-base';

@NgModule({
    imports: [
        FormNotificationModule
    ],
    declarations: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```
Para o uso do seletor basta adicionar o seguinte codigo no arquivo __.html__ que desejar
```typescript
<basis-form-notification name="Field Name">
    <input class="ng-dirty ui-inputtext ui-corner-all ui-state-default ui-widget ui-state-filled" pinputtext="" placeholder="Invalid" type="text">
</basis-form-notification>
```