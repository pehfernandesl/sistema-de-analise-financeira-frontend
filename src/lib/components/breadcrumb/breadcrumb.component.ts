import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { AccessbilityService } from '../../base/accessibility/accessibility.service';
import { BreadcrumbService } from './breadcrumb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, AfterViewInit {
  subscription: Subscription;

  items: MenuItem[];

  highContrastEnabled = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly messages: MessageService,
    private readonly accessibilityService: AccessbilityService
  ) {
    this.subscription = breadcrumbService.itemsHandler.subscribe((response) => {
      this.items = response;
    });
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe((event) => {
        this.items = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  enableHighContrast() {
    this.highContrastEnabled = true;
    this.accessibilityService.enableHighContrast();
  }

  disableHighContrast() {
    this.highContrastEnabled = false;
    this.accessibilityService.disableHighContrast();
  }

  increaseFontSize() {
    this.accessibilityService.increaseFontSize();
  }

  decreaseFontSize() {
    this.accessibilityService.decreaseFontSize();
  }

  ngAfterViewInit() {
    this.messages.messageObserver.subscribe((msg: Message) => {
      this.accessibilityService.addAccessibilityMessages({
        severity: msg.severity
      });
    });
    this.accessibilityService.addAccessibilityIcons();
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb
        : '';
    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');

    if (isDynamicRoute && !!route.snapshot) {
      for (let key in route.snapshot.params) {
        path = path.replace(`:${key}`, route.snapshot.params[key]);
      }
      label = Object.values(route.snapshot.params).join(' ');
    }

    const nextUrl = path ? `${url}/${path}` : url;

    const menuItem: MenuItem = {
      label: label,
      routerLink: nextUrl
    };

    const newBreadcrumbs = menuItem.label
      ? [...breadcrumbs, menuItem]
      : [...breadcrumbs];

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
