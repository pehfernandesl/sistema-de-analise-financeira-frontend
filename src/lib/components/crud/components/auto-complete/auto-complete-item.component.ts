import { Component, Input, Output, TemplateRef, EventEmitter } from "@angular/core";

@Component({
    selector: 'p-autoCompleteItem',
    template: `
        <li role="option" [ngClass]="{'ui-autocomplete-list-item ui-corner-all':true,'ui-state-highlight':(highlightOption==option)}"
            (mouseenter)="highlightOptionChange.emit(option)" (mouseleave)="highlightOptionChange.emit(null)"
            [id]="highlightOption == option ? 'p-highlighted-option':''" (click)="selectItem($event)"
            [ngStyle]="{'height': itemSize + 'px', 'display': 'table', 'width': '100%'}">
            <span *ngIf="!template">{{resolvedFieldData}}</span>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option, index: index}"></ng-container>
        </li>
    `
})
export class AutoCompleteItem {

    @Input() option: any;

    @Input() resolvedFieldData: any;

    @Input() highlightOption: any;

    @Output() highlightOptionChange = new EventEmitter<any>();

    @Input() index: number;

    @Input() itemSize: number;

    @Input() template: TemplateRef<any>;

    @Output() onClick = new EventEmitter();

    selectItem(event: Event): void {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    }
}
