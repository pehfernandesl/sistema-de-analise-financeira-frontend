import { Component } from '@angular/core';
import { provideValueAccessor } from '@nuvem/angular-base';
import { FieldComponent } from '../field.component';

@Component({
  selector: '[nTextArea]',
  templateUrl: './text-area.component.html',
  providers: [provideValueAccessor(TextAreaComponent)]
})
export class TextAreaComponent extends FieldComponent<string> {}
