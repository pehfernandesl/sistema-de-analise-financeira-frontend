# Error
O modulo de erros contem funcionalidades para a captura e apresentação dos erros que possam ocorrer na aplicação.

## Modulo

Para utilização do modulo as seguintes configurações devem ser realizadas no arquivo __app.module.ts__:

```typescript
import {
    ...
    ErrorModule
} from '@nuvem/angular-base';

import {
    ...
    PageNotificationModule,
    ErrorStackModule
} from '@nuvem/primeng-components';

@NgModule({
    imports: [
        ...
        PageNotificationModule,
        ErrorStackModule,
        ErrorModule
    ],
    declarations: [
        ...
        DiarioErrosComponent,
    ],

    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }