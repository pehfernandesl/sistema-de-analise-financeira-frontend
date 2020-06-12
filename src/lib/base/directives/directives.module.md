# Directive
O modulo de diretivas expõe diretivas de uso comum para as aplicações, podendo ser elas : 

    [hasRoleMenu] -> Checagem de permissão de acesso  aos itens de menu 
    [hasRole] -> Checagem de permissão de acesso
    input[onlyNumbers] -> Permite apenas números para campos do tipo input
    [unmask] -> Remove mascara de campos 

## Module

Adicione o módulo `DirectivesModule` ao modulo que deseja utilizar as diretivas, na seção de `imports`:

```typescript
import { DirectivesModule } from '@nuvem/angular-base';

@NgModule({
  imports: [
    DirectivesModule
  ]
})
export class MyModule {}
```