import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng';
import { Subject } from 'rxjs';

@Injectable()
export class BreadcrumbService {
  private readonly itemsSource = new Subject<MenuItem[]>();

  itemsHandler = this.itemsSource.asObservable();

  setItems(items: MenuItem[]) {
    this.itemsSource.next(items);
  }

  reset() {
    this.itemsSource.next([]);
  }
}
