import { Component, Input, TemplateRef } from '@angular/core';
import { provideValueAccessor } from '@nuvem/angular-base';
import { FieldComponent } from '../field.component';
import { CrudService } from '../../crud-service.service';

@Component({
  selector: '[nAutoComplete]',
  templateUrl: './auto-complete.component.html',
  providers: [provideValueAccessor(AutoCompleteComponent)]
})
export class AutoCompleteComponent extends FieldComponent<any> {
  @Input() field: string;

  @Input() virtualScroll: boolean = false;

  @Input() itemSize: number = 30;

  @Input() service: CrudService<any, any>;

  results: any[];

  selectItem(option) {
    this.formControl.setValue(option);
  }

  findAll(event: any) {
    let query = {};
    query[this.field] = event.query;
    this.service.findAll(query).subscribe((data) => {
      this.results = data;
    });
  }

  protected outerToInner(value: any): any {
    if (value && value.id && !value[this.field]) {
      this.service.find(value.id).subscribe((data) => {
        this.formControl.setValue(data);
      });
    }
    return value;
  }
}
