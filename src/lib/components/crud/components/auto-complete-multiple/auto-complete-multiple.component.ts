import { Component, Input } from '@angular/core';
import { provideValueAccessor } from '@nuvem/angular-base';
import { FieldComponent } from '../field.component';
import { CrudService } from '../../crud-service.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: '[nAutoCompleteMultiple]',
  templateUrl: './auto-complete-multiple.component.html',
  providers: [provideValueAccessor(AutoCompleteMultipleComponent)]
})
export class AutoCompleteMultipleComponent extends FieldComponent<any[]> {
  @Input() field: string;

  @Input() service: CrudService<any, any>;

  @Input() virtualScroll: boolean = false;

  @Input() itemSize: number = 30;

  results: any[];

  findAll(event: any) {
    let query = {};
    query[this.field] = event.query;
    this.service.findAll(query).subscribe((data) => {
      this.results = data;
    });
  }

  protected outerToInner(value: any[]): any[] {
    if (value && value.length > 0 && !value[0][this.field]) {
      let obs: any[] = [];
      value.forEach((element) => {
        if (element && element.id) {
          obs.push(this.service.find(element.id));
        }
      });
      forkJoin(obs).subscribe((data) => {
        this.formControl.setValue(data);
      });
    }
    return value;
  }
}
