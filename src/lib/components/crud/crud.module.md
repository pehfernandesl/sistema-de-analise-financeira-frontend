# Crud

O componente Crud utiliza internamente diversos componentes para criar a estrutura para as operações do crud. 

## Módulo

Para utilizar o componente, adicione o `CrudModule` ao `AppModule` ou ao módulo que deseja utilizar, na seção de `imports`:

```typescript
...
import { CrudModule } from '@nuvem/primeng-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    CrudModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Exemplos

### Rotas

Para configurar as rotas para o componente, foi criado a função `crudRouteBuilder(route: string, parent: any, list: any, form: any)`, que recebe os parâmetros para configuração do crud. A tabela abaixo especifica a função de cada um desses parâmetros:

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| route | string | Prefixo para as demais rotas do crud |
| parent | Component | Componente base para renderização dos demais componentes do crud |
| list | Component | Component para listar os registros do crud |
| form | Component | Componente com o formulário para as operações de cadastro, alteração e visualização de um registro do crud |

O exemplo abaixo ilustra a utilização dessa função para configuração de uma rota:

```typescript
@NgModule({
  imports: [
    RouterModule.forChild([
      crudRouteBuilder("crud", ParentComponent, ListComponent, FormComponent)
    ])
  ],
  exports: [
    RouterModule
  ]
})
```

O template html do componente `ParentComponent` deve conter uma chamada ao componente `<router-outlet>` para renderização dos demais componentes do crud. Um exemplo dessa implementação pode ser visto abaixo:


```html
<div class="ui-g ui-fluid">
    <div class="ui-g-12 ui-m-12">
        <router-outlet></router-outlet>
    </div>
</div>
```


### nCrudList

É livre a implementação do componente `ListComponent`, mas para facilitar o uso dessa funcionalidade, foi criado o componente `nCrudList`. O componente `<p-column>` pode ser utilizado internamente para customização das colunas da tabela. Segue abaixo um exemplo de utilização desse componente:

```html
<h1>Crud List</h1>
<nCrudList [form]="formGroup">
    <p-column field="name" header="Input Text"></p-column>
    <p-column field="email" header="Text Area"></p-column>
    <p-column field="calendar" header="Calendar">
        <ng-template let-col="col" let-rowData="rowData" pTemplate="body">
            <span>{{ rowData[col.field] | date: 'dd/MM/y' }}</span>
        </ng-template>
    </p-column>
    <div nForm [formGroup]="formGroup">
        <div nInputText label="Input Text" formControlName="name" class="ui-g-12 ui-lg-6 ui-md-6 ui-sm-12"></div>
        <div nCalendar label="Calendar" formControlName="calendar" class="ui-g-12 ui-lg-6 ui-md-6 ui-sm-12"></div>
    </div>
</nCrudList>
```


### nCrudForm

É livre a implementação do componente `FormComponent`, mas para facilitar o uso dessa funcionalidade, foi criado o componente `nCrudForm`. Um exemplo de utilização desse componente pode ser visto abaixo:


```html
<h1>Crud Form</h1>
<nCrudForm [form]="form" [formGroup]="form">
    <div nInputText minLength="14" maxLength="14" required label="Input Text" formControlName="inputText" class="ui-g-12 ui-lg-4 ui-md-4 ui-sm-12"></div>
    <div nAutoComplete [service]="crud1Entity" field="name" formControlName="entity" label="Entity" class="ui-g-12 ui-lg-4 ui-md-4 ui-sm-12"></div>
    <div nCalendar label="Calendar" formControlName="calendar" class="ui-g-12 ui-lg-4 ui-md-4 ui-sm-12"></div>
    <div nTextArea label="Text Area" formControlName="textArea" class="ui-g-12 ui-lg-6 ui-md-6 ui-sm-12"></div>
    <div nAutoCompleteMultiple [service]="crud1Entity" field="name" formControlName="entities" label="Entities" class="ui-g-12 ui-lg-6 ui-md-6 ui-sm-12"></div>
</nCrudForm>
```

### CrudServiceNuvem

A service `CrudServiceNuvem` auxilia na criação da service que será utilizada nas operações do crud. Para usar essa classe, basta estendê-la, e no método construto passar o `endpoint` do backend. Um exemplo de implementação dessa classe pode ser visto abaixo: 


```typescript
import { Injectable } from "@angular/core";
import { CrudServiceNuvem } from "@nuvem/primeng-components";
import { HttpClient } from "@angular/common/http";

import { Crud1Entity } from "./crud1-entity.service";

export class Crud1 {
    constructor(
        public id: number,
        public name: string,
        public inputArea: string,
        public calendar: string,
        public entity: Crud1Entity,
        public entities: Crud1Entity[]
    ) {}
}

@Injectable({ providedIn: 'root' })
export class Crud1Service extends CrudServiceNuvem<number, Crud1> {

    constructor(http: HttpClient) {
        super('https://primeng-components.getsandbox.com/users', http);
    }

}
```

## nInputText

### Propriedades

| Nome | Tipo | Valor Padrão | Descrição |
| ---- | ---- | ------------ | --------- |
| _label | string | null | Label do campo |
| form | string | null | Nome do formulário (utilizado para validações) |
| formControlName | string | null | Nome do campo no formulário |
| required | boolean | false | Determina a obrigatoriedade de prenchimento do campo |
| minLength | number | null | Quantidade mínima de caracteres |
| maxLength | number | null | Quantidade máxima de caracteres |
| min | number | null | Valor mínimo para campos numéricos |
| max | number | null | Valor máximo para campos numéricos |
| pattern | string\|RegExp |  null | Especifica uma expressão regular para validação do campo |
| extraParams | Object | null | Parâmetros extra para o campo |

### Eventos

| Nome | Parâmetros | Descrição |
| ---- | ---------- | --------- |
| onBlur | Browser Event| Método executado ao sair so campo |
| onFocus | Browser Event | Método executado quando o campo ganha o focu |

## nCalendar

### Propriedades

| Nome | Tipo | Valor Padrão | Descrição |
| ---- | ---- | ------------ | --------- |
| _label | string | null | Label do campo |
| form | string | null | Nome do formulário (utilizado para validações) |
| formControlName | string | null | Nome do campo no formulário |
| required | boolean | false | Determina a obrigatoriedade de prenchimento do campo |
| pattern | string\|RegExp |  null | Especifica uma expressão regular para validação do campo |
| extraParams | Object | null | Parâmetros extra para o campo |

### Eventos

| Nome | Parâmetros | Descrição |
| ---- | ---------- | --------- |
| onBlur | Browser Event| Método executado ao sair so campo |
| onFocus | Browser Event | Método executado quando o campo ganha o focu |
| onSelect | Browser Event | Método executado quando um valor é selecionado |

## nTextArea

### Propriedades

| Nome | Tipo | Valor Padrão | Descrição |
| ---- | ---- | ------------ | --------- |
| _label | string | null | Label do campo |
| form | string | null | Nome do formulário (utilizado para validações) |
| formControlName | string | null | Nome do campo no formulário |
| required | boolean | false | Determina a obrigatoriedade de prenchimento do campo |
| minLength | number | null | Quantidade mínima de caracteres |
| maxLength | number | null | Quantidade máxima de caracteres |
| pattern | string\|RegExp |  null | Especifica uma expressão regular para validação do campo |
| extraParams | Object | null | Parâmetros extra para o campo |

### Eventos

| Nome | Parâmetros | Descrição |
| ---- | ---------- | --------- |
| onBlur | Browser Event| Método executado ao sair so campo |
| onFocus | Browser Event | Método executado quando o campo ganha o focu |

## nAutoComplete

### Propriedades

| Nome | Tipo | Valor Padrão | Descrição |
| ---- | ---- | ------------ | --------- |
| _label | string | null | Label do campo |
| form | string | null | Nome do formulário (utilizado para validações) |
| formControlName | string | null | Nome do campo no formulário |
| required | boolean | false | Determina a obrigatoriedade de prenchimento do campo |
| minLength | number | null | Quantidade mínima de caracteres |
| maxLength | number | null | Quantidade máxima de caracteres |
| pattern | string\|RegExp |  null | Especifica uma expressão regular para validação do campo |
| extraParams | Object | null | Parâmetros extra para o campo |

### Eventos

| Nome | Parâmetros | Descrição |
| ---- | ---------- | --------- |
| onBlur | Browser Event| Método executado ao sair so campo |
| onFocus | Browser Event | Método executado quando o campo ganha o focu |
| onSelect | Browser Event | Método executado quando um valor é selecionado |

## nAutoCompleteMultiple

### Propriedades

| Nome | Tipo | Valor Padrão | Descrição |
| ---- | ---- | ------------ | --------- |
| _label | string | null | Label do campo |
| form | string | null | Nome do formulário (utilizado para validações) |
| formControlName | string | null | Nome do campo no formulário |
| required | boolean | false | Determina a obrigatoriedade de prenchimento do campo |
| minLength | number | null | Quantidade mínima de caracteres |
| maxLength | number | null | Quantidade máxima de caracteres |
| pattern | string\|RegExp |  null | Especifica uma expressão regular para validação do campo |
| extraParams | Object | null | Parâmetros extra para o campo |

### Eventos

| Nome | Parâmetros | Descrição |
| ---- | ---------- | --------- |
| onBlur | Browser Event| Método executado ao sair so campo |
| onFocus | Browser Event | Método executado quando o campo ganha o focu |
| onSelect | Browser Event | Método executado quando um valor é selecionado |
