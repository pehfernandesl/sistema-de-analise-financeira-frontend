# Breadcrumb

O componente Breadcrumb renderiza a visualizaçaõ do breadcrumb baseado na rota atual.

## Módulo

Importe o `BreadcrumbModule` no `AppModule` e adicione o mesmo na seção de `imports`:

```typescript
import { BreadcrumbModule } from '@nuvem/primeng-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    BreadcrumbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Exemplo

Adicione o componente `breadcrumb` no seu arquivo html no local desejado para exibição, conforme exemplo abaixo:

```html
<div>
    <breadcrumb></breadcrumb>
</div>
```

Para customizar o label exibido no breadcrumb, edite o arquivo de rotas adicionando o parametro `breadcrumb` ao objeto `data`, conforme exemplo a seguir:

```typescript
...
const routes: Routes = [
    { path: 'cadastro', component: TableMemoryOverviewComponent, data: { breadcrumb: 'cadastro' },
    { path: 'pesquisa-complementar', component: TableServerOverviewComponent, data: { breadcrumb: 'Pesquisa complementar' }}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatatableOverviewRoutingModule { }
...
```
