# Common Mask
O service `CommonMask` tem como objetivo fornecer um soporte a mascaras ao campos que não permitem a inserção nativa de tal recurso, as chamadas dos metodos para criação das mascas pode ser feita a partir do evento `keyup`.

## Módulo

Adicione o módulo ``CommonMask`` ao `AppModule`, na seção de `imports`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// módulo do componente CommonMaskModule
import { CommonMaskModule } from '@nuvem/angular-base';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Importação do módulo
    CommonMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Exemplo
```html
<p-calendar name="dataNascimento" [(ngModel)]="pessoa.dataNascimento" dateFormat="dd/mm/yy" (keyup)="dateMask($event)"></p-calendar>
```

```typescript
import { CommonMaskService } from '@nuvem/angular-base'; // RELEVANTE

@Component({
  selector: 'jhi-tipo-equipe',
  templateUrl: './tipo-equipe.component.html'
})
export class PessoaComponent implements OnInit, OnDestroy {

    constructor(
      private mask: CommonMaskService // RELEVANTE
    ) { } 

  dateMask($event) {//RELEVANTE
    this.mask.dateMask($event);
  }
}
```