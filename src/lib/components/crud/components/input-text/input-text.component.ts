import { Component } from '@angular/core';
import { provideValueAccessor } from '@nuvem/angular-base';
import { FieldComponent } from '../field.component';

@Component({
  selector: '[nInputText]',
  templateUrl: './input-text.component.html',
  providers: [provideValueAccessor(InputTextComponent)]
})
export class InputTextComponent extends FieldComponent<string> {}
