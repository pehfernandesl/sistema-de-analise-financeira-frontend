import { Component, OnInit, Inject, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CrudService, CRUD_SERVICE } from "../../crud-service.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'nForm',
    templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

    @Input() form: FormGroup;

    @Input() route: [];

    @Input() action: string = "save";

    @Input() saveLabel: string = "Salvar";

    @Input() service: CrudService<any, any>;

    @Output() save: EventEmitter<any> = new EventEmitter<any>();

    @Output() reset: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        @Inject(CRUD_SERVICE)
        private crudService: CrudService<any, any>,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.service) {
            this.crudService = this.service;
        }
    }

    submit() {
        if (this.save.observers.length) {
            this.save.emit(this.form.value);
        } else {
            this.crudService[this.action](this.form.value)
            .subscribe(() => {
                if (this.route) {
                    this.router.navigate(this.route, { relativeTo: this.activatedRoute });
                } else if (this.reset.observers.length) {
                    this.reset.emit(this.form);
                } else {
                    this.form.reset();
                }
            });
        }
    }

}
