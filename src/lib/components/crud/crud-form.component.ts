import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudService } from './crud-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nCrudForm',
  templateUrl: './crud-form.component.html'
})
export class CrudFormComponent implements OnInit {
  @Input() form: FormGroup;

  @Input() service: CrudService<any, any>;

  action: string;

  listRoute: string = '../../list';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.action = params.get('action');

      if (params.get('id')) {
        this.route.data.subscribe((data) => {
          if (data.value) {
            this.form.patchValue(data.value);
          }
        });
      } else {
        this.listRoute = '../list';
      }
      if (this.action === 'view') {
        this.form.disable();
      } else if (this.form.disabled) {
        this.form.enable();
      }
    });
  }
}
