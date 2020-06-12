import { Component, ElementRef, Renderer2, ChangeDetectorRef, IterableDiffers, Input, forwardRef } from '@angular/core';
import { AutoComplete as AutoCompletePrimeng } from 'primeng/autocomplete';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const AUTOCOMPLETE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoCompleteCustomComponent),
    multi: true
  };

@Component({
    selector: 'p-autoCompleteCustom',
    templateUrl: './auto-complete-custom.component.html',
    providers: [AUTOCOMPLETE_VALUE_ACCESSOR]
})
export class AutoCompleteCustomComponent extends AutoCompletePrimeng {

    @Input() virtualScroll: boolean;

    @Input() itemSize: number;

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public differs: IterableDiffers) {
        super(el, renderer, cd, differs)
    }

}
