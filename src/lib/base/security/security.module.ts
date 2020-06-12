import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutDirective } from './authentication/logout.directive';
import { UserDirective } from './authentication/user.directive';
import { LoginSuccessComponent } from './authentication/login-success.component';
import { HasRoleDirective } from './authentication/authorization/has-role.directive';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HideWhileLoginComponent } from './authentication/hide-while-login.component';
import { AUTH_CONFIG, AuthConfig } from './config/auth-config';
import { AuthorizationService } from './authentication/authorization/authorization.service';
import { AuthenticationService } from './authentication/authentication.service';
import { Authorization } from './authentication/authorization/authorization';
import { Authentication } from './authentication/authentication';
import { NotAuthenticatedErrorProvider } from './authentication/not-authenticated-error-provider.service';
import { ErrorProvider } from '../error/providers/error.provider';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTAuthInterceptor } from './token/jwt-auth.interceptor';
import { Token } from './token/token';
import { JWTTokenService } from './token/jwt-token.service';

/**
 * O modulo de segurança contem funcionalidades para autenticação, autorização, redirecionamento 
 * para login, gerenciamento de tokens JWT e obtenção e armazenamento de dados de usuário.
 * @class
 */
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ],
    declarations: [
        LogoutDirective,
        UserDirective,
        LoginSuccessComponent,
        HasRoleDirective,
        HideWhileLoginComponent
    ],
    providers: [
        AuthorizationService,
        AuthenticationService,
        { provide: ErrorProvider, useClass: NotAuthenticatedErrorProvider, multi: true },
        { provide: Authorization, useClass: AuthorizationService },
        { provide: Authentication, useClass: AuthenticationService }
    ],
    exports: [
        LogoutDirective,
        UserDirective,
        LoginSuccessComponent,
        HasRoleDirective,
        HideWhileLoginComponent
    ]
})
export class SecurityModule {

    /**
     * forRoot method
     * @public
     * @static
     * @returns ModuleWithProviders
     */
    static forRoot(config: AuthConfig): ModuleWithProviders {
        return { 
            ngModule: SecurityModule, 
            providers: [
                { provide: AUTH_CONFIG, useValue: config },
                config.tokenStorageIndex ? 
                  [ 
                    { provide: Token, useClass: JWTTokenService },
                    { provide: HTTP_INTERCEPTORS, useClass: JWTAuthInterceptor, multi: true }
                  ] : []
            ]
        };
    }

}
