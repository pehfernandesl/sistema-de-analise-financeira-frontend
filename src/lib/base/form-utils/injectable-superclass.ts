import { OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, Unsubscribable } from 'rxjs';

/**
 * Use as the superclass for anything managed by angular's dependency injection for care-free use of `subscribeTo()`. It simply calls `unsubscribe()` during `ngOnDestroy()`. If you override `ngOnDestroy()` in your subclass, be sure to invoke the super implementation.
 *
 * ```ts
 * @Injectable()
 * // or @Component() (also consider DirectiveSuperclass)
 * // or @Directive() (also consider DirectiveSuperclass)
 * // or @Pipe()
 * class MyThing extends InjectableSuperclass {
 *   constructor(somethingObservable: Observable) {
 *     super();
 *     this.subscribeTo(somethingObservable);
 *   }
 *
 *   ngOnDestroy() {
 *     // if you override ngOnDestroy, be sure to call this too
 *     super.ngOnDestroy();
 *   }
 * }
 * ```
 */
export abstract class InjectableSuperclass
  implements Unsubscribable, OnDestroy {
  private subscriptions = new Subscription();

  destruction$: Observable<undefined>;

  private destructionSubject = new Subject<undefined>();

  constructor() {
    this.destruction$ = this.destructionSubject.asObservable();
  }

  subscribeTo<T>(
    observable: Observable<T>,
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ) {
    this.subscriptions.add(
      observable.subscribe(
        this.bind(next),
        this.bind(error),
        this.bind(complete)
      )
    );
  }

  unsubscribe() {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
  }

  private bind(fn?: (val?: any) => void) {
    return fn?.bind(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
    this.destructionSubject.next();
    this.destructionSubject.complete();
  }
}
