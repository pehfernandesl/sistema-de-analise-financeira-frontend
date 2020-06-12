# Pipes
O modulo de pipes tem como objetivo expor pipes que dão suporte a formatação de valores tais como CEP, CPF, CNPJ, expressões regulares e limitadores de apresentação.

## Modulo
Adicione o módulo `PipeModule` ao modulo que deseja utilizar os pipes, na seção de `imports`:

```typescript
import { PipeModule } from '@nuvem/angular-base';

@NgModule({
  imports: [
    PipeModule
  ]
})
export class MyModule {}
```
## Uso
```typescript
{{ value | cep }}
{{ value | cpf }}
{{ value | cnpj }}
{{ value | limit:20:'...' }}
{{ value | regex:arg1:arg2 }}
```