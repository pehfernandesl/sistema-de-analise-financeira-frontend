import { Component, Input, AfterViewInit } from '@angular/core';
import { provideValueAccessor } from '@nuvem/angular-base';
import { FieldComponent } from '../field.component';
import { CrudService } from '../../crud-service.service';

@Component({
  selector: '[nDropdown]',
  templateUrl: './dropdown.component.html',
  providers: [provideValueAccessor(DropdownComponent)]
})
export class DropdownComponent extends FieldComponent<any>
  implements AfterViewInit {
  @Input() optionLabel: string;

  @Input() virtualScroll = false;

  @Input() filter = false;

  @Input() itemSize = 30;

  @Input() service: CrudService<any, any>;

  @Input() options: any[] = [];

  findAll() {
    this.service.findAll(null).subscribe((data) => {
      this.options = data;
    });
  }

  protected outerToInner(value: any): any {
    if (value && value.id) {
      this.service.find(value.id).subscribe((data) => {
        this.formControl.setValue(data);
      });
    }
    return value;
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.service) {
      this.findAll();
    }
  }
}
