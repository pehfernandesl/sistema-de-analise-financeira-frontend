# Datatable

O componente Datatable utiliza internamente o componente DataTable do PrimeNG. Suas características principais são:

* Suporte a dados providos em memória ou via API;
* Requisições para a API e exibição dos dados já paginados. Compatível com o padrão Pageable do Spring;
* Suporte a utilização de tokens nos cabeçalhos para autenticação, como o JWT;
* Exibição por padrão dos botões de incluir, editar e excluir, podendo ser incluídos mais botões customizados conforme necessidade;
* Utilização do componente `<p-column>` do PrimeNG para definição e formatação das colunas.

Índice:
- [Datatable](#datatable)
  - [Módulo](#m%c3%b3dulo)
  - [Exemplo](#exemplo)
    - [Server](#server)
    - [Memória](#mem%c3%b3ria)
  - [Inputs](#inputs)
    - [DatatablePaginationParameters](#datatablepaginationparameters)
  - [Outputs](#outputs)
    - [DatatableClickEvent](#datatableclickevent)
  - [Métodos](#m%c3%a9todos)
  - [Paginação](#pagina%c3%a7%c3%a3o)
    - [Mensagem de Rodapé](#mensagem-de-rodap%c3%a9)
  - [Botões](#bot%c3%b5es)
    - [Botões customizados](#bot%c3%b5es-customizados)
  - [Autorização](#autoriza%c3%a7%c3%a3o)
  - [Filtros](#filtros)
    - [Filtros de Colunas](#filtros-de-colunas)
    - [Ordenação de Colunas](#ordena%c3%a7%c3%a3o-de-colunas)
    - [Definição de Regras de acesso para botões padrões](#defini%c3%a7%c3%a3o-de-regras-de-acesso-para-bot%c3%b5es-padr%c3%b5es)
  - [Exemplos Práticos](#exemplos-pr%c3%a1ticos)
    - [Adicionando botões customizados horizontais com scroll vertical](#adicionando-bot%c3%b5es-customizados-horizontais-com-scroll-vertical)
    - [Adicionando splitButton para tabela](#adicionando-splitbutton-para-tabela)
    - [Scroll horizontal para tabela com múltiplas colunas](#scroll-horizontal-para-tabela-com-m%c3%baltiplas-colunas)
    - [Adicionando regras de acesso para botões padrões](#adicionando-regras-de-acesso-para-bot%c3%b5es-padr%c3%b5es)
    - [Customizando 'horizontalButtonsHeader'](#customizando-horizontalbuttonsheader)

## Módulo

Adicione o `DatatableModule` e o `SharedModule` ao `AppModule`, na seção de `imports`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// módulo do componente Datatable
import { DatatableModule, SharedModule } from '@nuvem/primeng-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    DatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Exemplo

### Server

```html
<basis-datatable type="server" url="https://xpto/api/v1/users" (buttonClick)="click($event)" #usersGrid>
  <p-column header="#" field="id"></p-column>
  <p-column header="Nome" field="name" [sortable]="true"></p-column>
  <p-column header="Email" field="email" [sortable]="true"></p-column>
  <p-column header="Data de Cadastro" field="createdAt" [sortable]="true">
    <ng-template let-col let-user="rowData" pTemplate="body">
      {{ user[col.field] | date: 'dd/MM/y H:mm' }}
    </ng-template>
  </p-column>
  <basis-datatable-button name="inativar" icon="block" tooltip="Inativar" class="ui-button-info"></basis-datatable-button>
</basis-datatable>
```

### Memória

```html
<basis-datatable type="memory" (buttonClick)="datatableClick($event)" [value]="carros" #memory>
  <p-column header="#" field="id"></p-column>
  <p-column header="Marca" field="marca"></p-column>
  <p-column header="Modelo" field="modelo"></p-column>
</basis-datatable>
```

## Inputs

| Input | Tipo | Opcional | Valor padrão | Descrição |
|----------------------|-------------------------------|----------|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| type | DataProviderType | sim | 'server' | 'server' para consultar os dados no input _url_ informado ou 'memory' pra usar os dados passados no input _value_ |
| value | any[] | sim | NA | coleção de registros que serão exibidos na datatable |
| url | string | sim | NA | define a url de endpoint na API que retorna os registros que serão exibidos na grid |
| rows | integer | sim | 5 | define a quantidade de linhas por página |
| extraParams | any[] | sim | [] | configurações adicionais para serem repassadas ao componente DataTable do PrimeNG |
| paginationParameters | DatatablePaginationParameters | sim | {"contentIndex": "content", "totalElementsIndex": "totalElements"} | configuções adicionais para alterar quais índices serão lidos na resposta da api |
| disableEdit | boolean | sim | false | desabilita o botão de edição |
| disableView | boolean | sim | false | desabilita o botão de visualização |
| disableDelete | boolean | sim | false | desabilita o botão de deleção |
| selectionMode | string | sim | 'single' | 'single' para permitir a seleção de um único registro e 'multiple' para um ou mais |
| rowsPerPageOptions | number[] | sim | NA | opções a serem mostradas para definir a quantidade de valores exibidos por página. Exemplo: [5, 10, 20] |
| showPaginationFooter | boolean | sim | false | mostra a quantidade de registros exibidos por página e o total de registros. 'Exibindo 6 a 10 de 100 registros' |
| enableButtonsScroll | boolean | sim | false | habilita que os botões `verticais` acompanhem o scroll da página. muito útil quando a quantidade de valores exibidos é alta, e também para quando o tamanho da tela é pequeno |
| emptyMessage | string | sim | 'Nenhum registro encontrado.' | Mensagem a ser mostrada quando não houver nenhum resultado |
| verticalButtons | boolean | sim | true | define se os botões de ação devem ser mostrados na vertical (direita da tabela) ou na horizontal (acima da tabela) |
| enableScroll | boolean | sim | false | habilita scroll horizontal/vertical |
| scrollHeight | string | sim | NA | altura do scroll vertical. só surte efeito se o input _enableScroll_ for 'true' |
| scrollWidth | string | sim | NA | largura do scroll horizontal. só surte efeito se o input _enableScroll_ for 'true' |
| rulesToShowView | any[] | sim | NA | Define acessibilidade do botão baseado no perfil de usuário logado
| rulesToShowEdit | any[] | sim | NA | Define acessibilidade do botão baseado no perfil de usuário logado
| rulesToShowDelete | any[] |  sim | NA | Define acessibilidade do botão baseado no perfil de usuário logado
| rulesToHideView | any[] | sim | NA | Define acessibilidade do botão baseado no perfil de usuário logado
| rulesToHideEdit | any[] | sim | NA | Define acessibilidade do botão baseado no perfil de usuário logado
| rulesToHideDelete | any[] |  sim | NA | Define acessibilidade do botão baseado no perfil de usuário logado
| horizontalButtonsHeader | string | sim | NA | texto a ser mostrado à esquerda do _header_ da tabela. só surte efeito se o input _verticalButtons_ for 'false' |
| disableLoadingBlockUI | boolean | sim | false | desabilita o blockUI para o modo `server` enquanto a requisição de carregamento dos dados está em execução. |
| splitButton | any | sim | NA | Responsavel por fornecer um botão do tipo splitButton para o datatable |
| rowStyleClass | any | sim | NA | Variável responsavel por permitir a a mudança do stilo das linhas.
| filterOnColumn| boolean | sim | false | Habilita os filtros por coluna.|
| customFilterOptions | Object | sim | Possibilita a customização dos valores dos selects dos filtros. A chave do objeto deve ser a chave da coluna|
| showVisibleColumnsControl | boolean | sim | Mostra o combo para selecionar as colunas visíveis na tabela

### DatatablePaginationParameters

| Propriedade | Tipo | Descrição |
|--------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| contentIndex | string | nome do índice do retorno da API onde os registos estão. Se for informado nulo, serão considerados os registros que estão na raiz da resposta. Suporta nested objects ('pai.filho.neto'). |
| totalElementsIndex | string | nome do índice do retorno da API onde a quantidade de registros total da coleção é informada. Se for informado nulo, será considerada a quantidade de registros retornados. |
| filterParams | any | Responsavel por indicar os campos para filtro |
| orderInSort | boolean | Responsavel por agregar ordem do campo na variavel sort.
| footerMsg | string | Responsavel por montar a mnesagem do footer do datatable.


Se houver o header `x-total-count` na resposta e não for passado nenhum objeto de configuração, o cabeçalho será utilizado para determinar a quantidade de registros total. 

Atenção, o Angular só consegue detectar a presença desse header se a opção `exposed-headers` do CORS autorizar.

Se os registros estiverem sendo providos em memória, essa opção será desconsiderada.

## Outputs

| Output | Tipo | Descrição |
|-------------|---------------------|-----------------------------------------------------------------------|
| buttonClick | DatatableClickEvent | retorna o nome do botão que foi clicado e a seleção |
| startedLoading | void | indica que o datatable no modo `server` iniciou a requisição de carregamento dos dados.  |
| finishedLoading | HttpErrorResponse | indica que o datatable no modo `server` finalizou a requisição de carregamento dos dados. |
| onRowSelected | void | Retorna dados da linha selecionada no datatable

### DatatableClickEvent

| Propriedade | Tipo | Descrição |
|-------------|--------|---------------------------------------|
| button | string | botão que foi clicado |
| selection | any | registro da linha selecionada na grid |

## Métodos

| Assinatura | Tipo de Entrada | Tipo de Saída | Descrição |
|----------------------------|-----------------|---------------|-------------------------------------------------------------------------|
| refresh(query?: any): void | any | nenhum | realiza uma nova requisição e renderiza a grid com os dados atualizados |
| reset(): void | any | nenhum | realiza uma nova requisição, **com filtro limpo**, e renderiza a grid **na primeira página** com os dados atualizados |
|filter(): void | any |	nenhum |	realiza uma busca baseada em parametros passados na variável filterParams

## Paginação

Para efetuar a paginação, o componente envia para API os seguintes parâmetros:

| Parâmetro | Tipo | Descrição |
|-----------|--------|-----------------------------------------------------------------------|
| page | number | página atual da grid |
| size | number | quantidade de registros que deve ser retornada na página |
| sort | string | coluna - field - que foi usada para ordenar os registros |
| order | string | direção da ordenação. "asc" para ascendente e "desc" para descendente |
| query | any | parâmetro utilizado para filtrar os resultados |

### Mensagem de Rodapé
Por padrão as mensagem de rodapé do datatable são desabilitadas para a sua apresentação é necessário realizar a seguinte configuração exemplo:

```html
<basis-datatable
  [url]="searchUrl"
  [paginationParameters]="data"
  (buttonClick)="datatableClick($event)"
  [showPaginationFooter]="true"
  #datatable
  >
  <p-column header="Nome" field="nome"></p-column>
  <p-column header="Município" field="municipio"></p-column>
</basis-datatable>
```
```typescript
ngOnInit() {
  this.datatable.footerMsg = 'Exibindo {currentLastIndex} de {totalRecords} registros';
}
```
Observe o parâmetro `showPaginationFooter` ele é responsável por apresentar as mensagens no rodapé do datatable, caso nenhuma mensagem seja passada para o `footerMsg` uma mensagem padrão será apresentada. Os valores possiveis a serem passados como parâmetro na mensagem são os seguintes: `{currentFirstIndex}`, `{currentLastIndex}` e `{totalRecords}` 

## Botões

Por padrão, os botões de incluir, editar e excluir são incluídos automaticamente. Para capturar o click do usuário, basta escutar o @Output `buttonClick`, conforme exemplo acima. O objeto retornado é do tipo DatatableClickEvent.

### Botões customizados

Para criar botões extras na grid, basta utilizar o componente `<basis-datatable-button>` dentro do `<basis-datatable>`. Os inputs são:

| Input | Tipo | Opcional | Descrição |
|------------------------|---------|----------|------------------------------------------------------------------------------------------------------------------------------------|
| name | string | não | nome do botão. São suportados apenas caracteres alfanuméricos |
| icon | string | não | ícone utilizado no botão. Lista completa de ícones disponíveis [aqui](https://www.primefaces.org/ultima-ng/#/utils) |
| tooltip | string | não | texto auxiliar que aparece como hint quando o cursor do usuário passa por cima do botão |
| class | string | sim | classes css adicionais para o botão |
| disabled | boolean | sim | habilita e desabilita o botão |
| allowMultipleSelection | boolean | sim | quando a múltipla seleção de registros estiver ativada, habilita e desabilita o botão conforme a quantidade de linhas selecionadas |

**Importante**: Quando a datatable possui botões horizontais (input [_`verticalButtons`_](#inputs) como 'false'), botões extras na grid devem ser adicionados de forma diferente, conforme exemplo [Adicionando botões customizados horizontais com scroll vertical](#adicionando-botões-customizados-horizontais-com-scroll-vertical).

## Autorização

O `DatatableService` pode utilizar qualquer objeto que implemente a mesma interface do Http (@angular/common/http) para se comunicar com a API. Por padrão o `HttpClient` é utilizado. Para trocar o componente http utilizado, deve ser registrado um novo `provider` dentro do `AppModule`. Exemplo com JWT (angular2-jwt):

```typescript
import { AuthHttp } from 'angular2-jwt';
import { DatatableService } from '@nuvem/primeng-components';
//...
providers: [
    //...
    {
        provide: DatatableService,
        useClass: DatatableService,
        deps: [AuthHttp]
    }
],
//...
```

## Filtros

Para filtrar os dados da grid, deve-se passar o filtro para o método refresh(). É possível passar uma string ou um objeto. Exemplo:

```html
  <input type="text" placeholder="Consulta" pInputText #query/>
  <button pButton type="button" (click)="usersGrid.refresh(query.value)" label="Pesquisar"></button>
```

Se for um datatable em memória, o próprio elemento do input deve ser enviado para o `refresh`. Exemplo:

```html
  <input type="text" placeholder="Consulta" pInputText #query/>
  <button pButton type="button" (click)="usersGrid.refresh(query)" label="Pesquisar"></button>
```

### Filtros de Colunas
É possível adicionar filtros as colunas da grid usando a seguinte estrutura de código. Exemplo:

```html
<basis-datatable 
          [url]="searchUrl"
          [verticalButtons]="false"
          [enableScroll]="true"
          [paginationParameters]="data"
          (buttonClick)="datatableClick($event)"
          #datatable
        >
    <p-column header="Nome" field="nome" [filter]="true">
      <ng-template pTemplate="filter" let-col>
            <input type="text" name="nome" [(ngModel)]="datatable.filterParams.nome" (keyup.enter)="datatable.filter()" [(ngModel)]="nome" pInputText />
      </ng-template>
    </p-column>
</basis-datatable>
```
Observe os seguintes valores passados no p-column __[filter]="true"__ este valor é responsável por definir a coluna como um filtro, a seguir observe os valores __[(ngModel)]="datatable.filterParams.nome"__ e __(keyup.enter)="datatable.filter()__" definidos para o ìnput estes valores são responsáveis respectivamente, para definir qual o valor será pesquisado, neste caso o valor a ser pesquisado é o nome, e a partir de qual evento o filtro de pesquisa será disparado, no exemplo o filtro de pesquisa será disparado no evento keyup.enter.

### Ordenação de Colunas

É possível adicionar filtros de ordenação nas colunas colunas utilizando a seguinte estrutura de código:

```html
<basis-datatable
          [url]="searchUrl"
          [verticalButtons]="false"
          [enableScroll]="true"
          [scrollHeight]="'500px'"
          [rowsPerPageOptions]="[5,10,50,100]"
          [rows]="50"
          [paginationParameters]="data"
          (buttonClick)="datatableClick($event)"
          #datatable
        >
          <p-column header="Nome" field="nome" [sortable]="true"></p-column>
        </basis-datatable>
```
No seu component pode ser informadado a seguinte variável
```typescript
ngOnInit() {
    this.datatable.orderInSort = true;
}
```
Com esta configuração as rotas geradas para a ordenação da dataTable teram o seguinte formato:  `sort=field,asc` caso a o valor __this.datatable.orderInSort__ não seja informado as rotas serão informadas desta maneira `sort=field&order=asc`

### Definição de Regras de acesso para botões padrões

Existem duas maneiras para definir as regras de acessibilidade para os botões padrões da datatable sendo elas:

**Rules Abrangentes**:
Lista ou strig com as rules que PODEM acessar os botões para isso os seguintes imputs devem ser definidos
_`rulesToHideView`_, _`rulesToShowEdit`_ e _`rulesToShowDelete`_ .

**Rules Excludentes**:
Lista ou strig com as rules que NÃO PODEM acessar os botões para isso os seguintes imputs devem ser definidos
_`rulesToHideView`_, _`rulesToHideEdit`_ e _`rulesToHideDelete`_ .

**Importante**: Caso os inputs não sejam definidos ou se nada for passado como parâmetro, 
a datatable apresentara os botões. Não é possível definir dois imputs para o mesmo botão padrão simultaneamente exemplo: 

```html
<basis-datatable 
  [url]="searchUrl"
  [rulesToShowView] = "['ROLE_ADMIN','ROLE_USER']"
  [rulesToHideview] = "['ROLE_SUPERVISOR']"
#datatable>
  <div class="horizontal-buttons" ngProjectAs="horizontalButtons">
    <basis-datatable-button
      class="horizontal-button"
      name="clone"
      icon="content-copy"
      tooltip="Clonar"
      disabled="desabilitarBotaoClonar()">
    </basis-datatable-button>
  </div>
  <!-- colunas e etc ... -->
</basis-datatable>
```

## Exemplos Práticos

### Adicionando botões customizados horizontais com scroll vertical

```html
<basis-datatable 
  [url]="searchUrl"
  (buttonClick)="datatableClick($event)"
  [verticalButtons]="false"
  [enableScroll]="true"
  [scrollHeight]="'500px'"
  #datatable>

  <div class="horizontal-buttons" ngProjectAs="horizontalButtons">
    <basis-datatable-button
      class="horizontal-button"
      name="clone"
      icon="content-copy"
      tooltip="Clonar"
      disabled="desabilitarBotaoClonar()">
    </basis-datatable-button>
  </div>

  <!-- colunas e etc ... -->
</basis-datatable>
```

Primeiramente, observe, na definição do `basis-datatable`, os valores dos inputs _`verticalButtons`_, _`enableScroll`_ e _`scrollHeight`_.

Na sequência, um novo botão customizado é adicionado. É necessário que uma nova _`div`_ seja definida, com a classe CSS `horizontal-buttons` e input _`ngProjectAs`_ com valor `'horizontalButtons'`. Todos os botões devem estar contidos nessa _`div`_.

Para manter a consistência do espaçamento entre os botões, cada botão deve possuir a classe CSS `horizontal-button`.

### Adicionando splitButton para tabela
```html
<basis-datatable 
  [url]="searchUrl"
  
  #datatable>

  <div class="horizontal-buttons" ngProjectAs="horizontalButtons">
    <basis-datatable-button
      [url]="searchUrl"
      [paginationParameters]="data" [rows]="rows"
      [splitButton]="buttonOptions"
      (buttonClick)="datatableClick($event)" 
      #datatable>
    </basis-datatable-button>
  </div>

  <!-- colunas e etc ... -->
</basis-datatable>
```
```typescript
import { DatatableComponent, DatatableClickEvent } from '@nuvem/primeng-components';
//...
export class MyComponent implements OnInit, OnDestroy {
  //...
  buttonOptions: any = {
    label: '',//informação opcional pode ser removida da lista
    icon: 'ui-icon-collections-bookmark',
    class: 'ui-button-icon-only',
    method: '',//informação opcional pode ser removida da lista
    itens: [
    { label: 'Redirect', icon: 'ui-icon-call-made', routerLink: 'https://basis.com.br'},
    { label: 'Exec Function', icon: 'ui-icon-filter-vintage', command: () => {
        this.myCommand();
    }],
  };

  myCommand() {
    console.log('Command result');
  }
```

Primeiramente, observe, na definição do `basis-datatable`, o valore do input _`splitButton`_, são passados os valores dos splitbutons apartir de uma variavel _`buttonOptions`_ criada no componente.


### Scroll horizontal para tabela com múltiplas colunas

Exemplo real de um projeto:

```html
<basis-datatable
  [url]="searchUrl"
  (buttonClick)="datatableClick($event)"
  [enableScroll]="true"
  #datatable>

  <p-column [style]="{'width': '200px'}" header="Tipo do Fornecedor" field="nomeTipoIdentificacao"></p-column>
  <p-column [style]="{'width': '200px'}" header="Identificação" field="nuIdentificacao"></p-column>
  <p-column [style]="{'width': '200px'}" header="Razão Social" field="txRazaoSocial"></p-column>
  <p-column [style]="{'width': '200px'}" header="Endereço" field="txEndereco"></p-column>
  <p-column [style]="{'width': '200px'}" header="Complemento" field="txComplemento"></p-column>
  <p-column [style]="{'width': '200px'}" header="Município" field="idMunicipio.nome"></p-column>
  <p-column [style]="{'width': '200px'}" header="Cep" field="nuCep"></p-column>
  <p-column [style]="{'width': '200px'}" header="Telefone" field="nuTelefone"></p-column>
  <p-column [style]="{'width': '200px'}" header="Banco" field="sqAgencia.banco.cdTipoBanco"></p-column>
  <p-column [style]="{'width': '200px'}" header="Número da Agência" field="sqAgencia.nuAgencia"></p-column>
  <p-column [style]="{'width': '200px'}" header="Conta" field="nuConta"></p-column>
  <p-column [style]="{'width': '200px'}" header="Status" field="nmAtivoInativo"></p-column>

</basis-datatable>
```

Primeiramente, observe, na definição do `basis-datatable`, o valor do input _`enableScroll`_.

Por fim, observe as definições das colunas (`p-column`). Todas colunas possuem um tamanho fixo para sua largura, definido pelo trecho de código `[style]="{'width': '200px'}"`. Um tamanho fixo para as colunas é **essencial** para o scroll horizontal.

É importante salientar que cada coluna pode ter um tamanho diferente, ao contrário do que é mostrado no exemplo, onde todas as colunas possuem tamanho igual (200px).

É importante salientar que cada coluna pode ter um tamanho diferente, ao contrário do que é mostrado no exemplo, onde todas as colunas possuem tamanho igual (200px).

### Adicionando regras de acesso para botões padrões

```html
<basis-datatable 
  [url]="searchUrl"
  [rulesToHideView] = "['ROLE_ADMIN','ROLE_USER', 'ROLE_SUPERVISOR']"
  [rulesToShowEdit] = "['ROLE_ADMIN','ROLE_SUPERVISOR']"
  [rulesToHideDelete] = "'ROLE_USER'"
  (buttonClick)="datatableClick($event)"
  [verticalButtons]="false"
  [enableScroll]="true"
  [scrollHeight]="'500px'"
  #datatable>

  <div class="horizontal-buttons" ngProjectAs="horizontalButtons">
    <basis-datatable-button
      class="horizontal-button"
      name="clone"
      icon="content-copy"
      tooltip="Clonar"
      disabled="desabilitarBotaoClonar()">
    </basis-datatable-button>
  </div>

  <!-- colunas e etc ... -->
</basis-datatable>
```
Primeiramente, observe a definição do `basis-datatable`, os valores dos inputs _`rulesToHideView`_, _`rulesToShowEdit`_ e _`rulesToHideDelete`_ .
Os valores passados para cada input representam o escopo de acesso a cada botão padrão 
da datatable.

### Customizando 'horizontalButtonsHeader'

O texto mostrado pelo input `horizontalButtonsHeader` tem a seguinte classe CSS aplicada:

```css
.horizontal-buttons-header {
  font-size: 1.3em;
  word-wrap: break-word;
}
```

Caso queira customizar o texto, é necessário sobreescrever a classe CSS em sua aplicação. Um exemplo é adicionar o seguinte código no arquivo `src/styles.css`:

```css
.horizontal-buttons-header {
  font-size: 2em !important;
  color: #99ff00;
  line-height: 1.6;
}
```