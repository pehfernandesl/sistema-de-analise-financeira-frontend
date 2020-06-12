import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AccessbilityModule } from '../lib/base/accessibility/accessibility.module';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './app.footer.component';
import { AppInlineProfileComponent } from './app.profile.component';
import { AppRightpanelComponent } from './app.rightpanel.component';
import { AppRoutes } from './app.routes';
import { AppTopbarComponent } from './app.topbar.component';
import { BlockUiModule } from '../lib/components/block-ui/block-ui.module';
import { BreadcrumbModule } from '../lib/components/breadcrumb/breadcrumb.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClipboardModule } from '../lib/base/clipboard/clipboard.module';
import { DatatableModule } from '../lib/components/datatable/datatable.module';
// import { DiarioErrosComponent } from './diario-erros/diario-erros.component';
import { ErrorModule } from '../lib/base/error/error.module';
import { ErrorStackModule } from '../lib/components/error-stack/error-stack.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from '../lib/components/menu/menu.module';
import { NgModule } from '@angular/core';
import { PRIMENG_IMPORTS } from './primeng-imports';
import { PageNotificationModule } from '../lib/components/page-notification/page-notification.module';
import { SecurityModule } from '../lib/base/security/security.module';
import { VersionTagModule } from '../lib/base/version-tag/version-tag.module';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutes,
    HttpClientModule,
    BrowserAnimationsModule,
    AccessbilityModule,
    VersionTagModule,
    BlockUiModule,
    PageNotificationModule,
    ErrorStackModule,
    ClipboardModule,
    ErrorModule,
    DatatableModule,
    SecurityModule.forRoot(environment.auth),
    BreadcrumbModule,
    MenuModule,
    PRIMENG_IMPORTS
  ],
  exports: [
    PRIMENG_IMPORTS
  ],
  declarations: [
    AppComponent,
    AppTopbarComponent,
    AppFooterComponent,
    AppRightpanelComponent,
    AppInlineProfileComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
