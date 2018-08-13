import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RootComponent } from './root.component';
import { CmsCommonModule } from './common/cms-common.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { MainRoutingModule } from './routes/main.router';
import { AppRoutingModule } from './routes/app.router';
import { CmsErrorHandler } from './common/error.handler';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/');
}

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    MainRoutingModule,
    AppRoutingModule,
    BrowserModule,
    CmsCommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [{ provide: ErrorHandler, useClass: CmsErrorHandler }],
  bootstrap: [RootComponent]
})
export class RootModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }
}
