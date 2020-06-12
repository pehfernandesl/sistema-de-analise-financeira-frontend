import { Injector } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FormControlSuperclass } from "./form-control-superclass";

export abstract class WrappedFormControlSuperclass<OuterType, InnerType = OuterType> extends FormControlSuperclass<OuterType> {

    formControl = new FormControl();

    constructor(injector: Injector) {
        super(injector);
        this.subscribeTo(this.formControl.valueChanges, (value) => {
            this.emitOutgoingValue(this.innerToOuter(value));
        });
        this.formControl.markAsTouched = () => {
            this.onTouched();
        };
    }

    /** Called as angular propagates values changes to this `ControlValueAccessor`. You normally do not need to use it. */
    handleIncomingValue(value: OuterType) {
        this.formControl.setValue(this.outerToInner(value), { emitEvent: false });
    }

    /** Called as angular propagates disabled changes to this `ControlValueAccessor`. You normally do not need to use it. */
    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.formControl.disable({ emitEvent: false });
        } else {
            this.formControl.enable({ emitEvent: false });
        }
        super.setDisabledState(this.isDisabled);
    }

    /** Override this to modify a value coming from the outside to the format needed within this component. */
    protected outerToInner(value: OuterType): InnerType {
        return (value as any) as InnerType;
    }

    /** Override this to modify a value coming from within this component to the format expected on the outside. */
    protected innerToOuter(value: InnerType): OuterType {
        return (value as any) as OuterType;
    }
}
