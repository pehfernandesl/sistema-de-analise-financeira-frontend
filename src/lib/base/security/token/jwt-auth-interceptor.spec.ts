import {} from 'jasmine';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { User } from '../authentication/user';
import { AuthenticationService } from '../authentication/authentication.service';
import { Authentication } from '../authentication/authentication';

import { JWTAuthInterceptor } from './jwt-auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthConfig, AUTH_CONFIG } from '../config/auth-config';

describe(`JWTAuthInterceptor`, () => {
  let service: AuthenticationService<User>;
  let httpMock: HttpTestingController;

  const config: AuthConfig = {
    baseUrl: 'http://localhost:8081',
    loginUrl: '/',
    logoutUrl: '/api/logout',
    detailsUrl: '/api/user/details',
    storage: localStorage,
    tokenStorageIndex: 'token',
    userStorageIndex: 'user',
    loginSuccessRoute: '/#/login-success'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AUTH_CONFIG, useValue: config },
        { provide: Authentication, useClass: AuthenticationService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JWTAuthInterceptor,
          multi: true
        }
      ]
    });

    service = TestBed.get(Authentication);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    service.getUserDetails().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(
      `${config.baseUrl}/${config.detailsUrl}`
    );

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });
});
