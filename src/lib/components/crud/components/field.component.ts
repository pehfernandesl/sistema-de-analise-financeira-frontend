import { Component, Injector, Input, OnInit, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from "@angular/core";
import { WrappedFormControlSuperclass } from "@nuvem/angular-base";
import { ControlContainer } from "@angular/forms";

@Component({
    selector: "[nField]",
    templateUrl: "./input-text/input-text.component.html"
})
export class FieldComponent<OuterType, InnerType = OuterType>
    extends WrappedFormControlSuperclass<OuterType, InnerType>
    implements OnInit, AfterViewInit {

    @Input() _label: string;

    @Input() form: string;

    @Input() private formControlName: string;

    @Input() private required: boolean;

    @Input() private minLength: number;

    @Input() private maxLength: number;

    @Input() private min: number;

    @Input() private max: number;

    @Input() private pattern: string | RegExp;

    @Input() private extraParams: any;

    @Output() onBlur: EventEmitter<any> = new EventEmitter<any>();

    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

    @Output() onFocus: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild("input", { static: false }) private input: any;

    private _name: string;

    get name(): string {
        return this._name ? this._name : this.formControlName;
    }

    @Input()
    set name(value: string) {
        this._name = value;
    }

    get label(): string {
        return this.required ? `${this._label}*` : this._label;
    }

    @Input()
    set label(value: string) {
        this._label = value;
    }

    constructor(
        private controlContainer: ControlContainer,
        private injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.setValidators();
        this.setRequired();
        this.setElementRefAttr("min", this.min);
        this.setElementRefAttr("max", this.max);
        this.setElementRefAttr("minLength", this.minLength);
        this.setElementRefAttr("maxLength", this.maxLength);
        this.setElementRefAttr("pattern", this.pattern);
    }

    setRequired() {
        if (this.required) {
            if (this.input instanceof ElementRef) {
                this.input.nativeElement.required = true;
            } else {
                this.input.required = true;
            }
        }
    }

    setElementRefAttr(attr: string, value: any) {
        if (value && this.input instanceof ElementRef) {
            this.input.nativeElement[attr] = value;
        }
    }

    setFormControlValidators() {
        if (this.controlContainer && this.formControlName) {
            let validator = this.controlContainer.control.get(this.formControlName).validator;
            if (validator) {
                this.formControl.setValidators(validator);
            }
        }
    }


    setValidators() {
        if (this.controlContainer && this.formControlName) {
            let validator = this.controlContainer.control.get(this.formControlName).validator;
            if (validator) {
                this.formControl.setValidators(validator);
            }
        }
    }

    ngAfterViewInit() {
        for (let i in this.extraParams) {
            if (this.input.hasOwnProperty(i)) {
                this.input[i] = this.extraParams[i];
            }
        }
    }

    onBlurEvent(event) {
        this.onBlur.emit(event);
    }

    onSelectEvent(event) {
        this.onSelect.emit(event);
    }

    onFocusEvent(event) {
        this.onFocus.emit(event);
    }
}
