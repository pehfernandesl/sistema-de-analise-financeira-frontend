import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccessbilityModule } from '@base/accessibility/accessibility.module';
import { ClipboardModule } from '@base/clipboard/clipboard.module';
import { ErrorModule } from '@base/error/error.module';
import { SecurityModule } from '@base/security/security.module';
import { VersionTagModule } from '@base/version-tag/version-tag.module';
import { BlockUiModule } from '@components/block-ui/block-ui.module';
import { BreadcrumbModule } from '@components/breadcrumb/breadcrumb.module';
import { DatatableModule } from '@components/datatable/datatable.module';
import { ErrorStackModule } from '@components/error-stack/error-stack.module';
import { MenuModule } from '@components/menu/menu.module';
import { PageNotificationModule } from '@components/page-notification/page-notification.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './app.footer.component';
import { AppInlineProfileComponent } from './app.profile.component';
import { AppRightpanelComponent } from './app.rightpanel.component';
import { AppTopbarComponent } from './app.topbar.component';
import { AuthGuard } from './auth.guard';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { ExtratosModule } from './extratos/extratos.module';
import { CadastroUsuarioComponent } from './cadastro-usuario.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccessbilityModule,
    VersionTagModule,
    BlockUiModule,
    PageNotificationModule,
    ErrorStackModule,
    ClipboardModule,
    ErrorModule,
    DatatableModule,
    BreadcrumbModule,
    MenuModule,
    SecurityModule.forRoot(environment.auth),
    SharedModule,
    LancamentosModule,
    ExtratosModule
  ],
  declarations: [
    AppComponent,
    AppTopbarComponent,
    AppFooterComponent,
    AppRightpanelComponent,
    AppInlineProfileComponent,
    DashboardComponent,
    LoginComponent,
    CadastroUsuarioComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
