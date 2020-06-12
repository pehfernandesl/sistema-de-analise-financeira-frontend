import { Route } from '@angular/router';

import { CrudResolveGuard } from './crud-resolve.guard';

export function crudRouteBuilder(route: string, parent: any, list: any, form: any): Route {
  return {
    path: route,
    component: parent,
    data: { breadcrumb: route },
    children: [
      {
        path: 'list',
        component: list,
        data: { breadcrumb: 'list' }
      },
      {
        path: ':action',
        component: form,
        data: { breadcrumb: ':action' }
      },
      {
        path: ':action/:id',
        component: form,
        resolve: {
          value: CrudResolveGuard
        },
        data: { breadcrumb: ':action' }
      }
    ]
  };


}
