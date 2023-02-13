import { HttpBackend, HttpClientModule, HttpEvent, HttpEventType, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule} from '@angular/material/menu';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { registerLocaleData } from '@angular/common';
import ar from '@angular/common/locales/ar';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { ErrorInterceptor } from './app-interceptors/error.interceptor';
import { JwtInterceptor } from './app-interceptors/jwt.interceptor';
import { Observable, filter, map } from 'rxjs';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './app-helpers/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NotFoundComponent } from './not-found/not-found.component';

export class TranslateHttpLoader implements TranslateLoader {
  constructor(
      private httpHandler: HttpBackend,
      public prefix: string,
      public suffix: string,
  ) { }

  getTranslation(lang: string): Observable<any> {
      const httpRequest = new HttpRequest('GET', `${this.prefix}${lang}${this.suffix}`);

      return this.httpHandler.handle(httpRequest)
                              .pipe(
                                  filter((evt: HttpEvent<unknown>) => evt.type === HttpEventType.Response),
                                  map((httpResponse: HttpEvent<any>) => (httpResponse as HttpResponse<any>).body),
                              );
  }
}

export function translateLoaderFactory(httpHandler: HttpBackend,): TranslateLoader {
  return new TranslateHttpLoader(httpHandler, './assets/i18n/', '.json');
}

export const TRANSLATE_MODULE_CONFIG: TranslateModuleConfig = {
  loader: {
      provide: TranslateLoader,
      useFactory: translateLoaderFactory,
      deps: [
          HttpBackend,
      ],
  },
  //...
};


registerLocaleData(ar)
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterSectionComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot(TRANSLATE_MODULE_CONFIG),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    Title,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'KWD'},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
