import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CRUD_SERVICE, CrudService } from './crud-service.service';

@Injectable()
export class CrudResolveGuard implements Resolve<any> {

  constructor(@Inject(CRUD_SERVICE) private crudService: CrudService<any, any>) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.crudService.find(route.paramMap.get('id'));
  }

}
