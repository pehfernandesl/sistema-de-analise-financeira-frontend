import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';

import { ErrorStackService } from '../../base/error/services/error-stack.service';
import { NamedErrorType } from '../../base/error/types/named-error.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'safi-error-stack',
  templateUrl: './error-stack.component.html'
})
export class ErrorStackComponent implements OnInit, OnDestroy {
  @Input() title = 'Error Stack';

  @Input() template: TemplateRef<any>;

  errors: NamedErrorType[] = [];

  private errorSubscription: Subscription;

  constructor(private errorStack: ErrorStackService) {
  }

  ngOnInit() {
    this.errorSubscription = this.errorStack.errors.subscribe(
      (error: NamedErrorType) => {
        this.errors = [error, ...this.errors];
      }
    );
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
