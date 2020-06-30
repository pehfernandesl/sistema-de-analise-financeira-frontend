import { Directive, ElementRef, OnInit, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 *
 * UnmaskDirective diretiva para remoção de mascaras de valores numericos
 * @class
 */
@Directive({
  selector: '[unmask]'
})
export class UnmaskDirective implements OnInit, OnDestroy {
  /**
   * Propriedade a para realizar a formatação expressão regular
   * @type {string} appUnmask
   */
  @Input() appUnmask: string;

  /**
   * Cria canal de escuta para a diretiva
   * @type {Subscription} subscriber
   */
  private subscriber;

  /**
   * constructor method
   * @param {ElementRef} elementRef
   * @param {NgControl} model
   * @constructor
   */
  constructor(private elementRef: ElementRef, private model: NgControl) {}

  /**
   * Metodo executado no carregamento da diretiva, executa verificação do valor e remove as mascaras baseado em um aexpressão regular
   * @returns void
   */
  ngOnInit(): void {
    this.subscriber = this.model.control.valueChanges.subscribe(() => {
      const newValue = this.elementRef.nativeElement.value.replace(
        new RegExp(this.appUnmask),
        ''
      );
      this.model.control.setValue(newValue, {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false
      });
    });
  }

  /**
   * ngOnDestroy method
   * @returns void
   */
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
