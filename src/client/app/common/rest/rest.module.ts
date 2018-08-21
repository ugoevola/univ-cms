

import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InexysHttpInterceptor } from './http.interceptor';
import { NgToolsModule } from '../ngtools/ngtools.module';
import { UserStore } from '../store/user.store';
import { ContentWebService } from '@rest/content.webservice';
import { HomeWebService } from '@rest/home.webservice';

const sharedServices = [ContentWebService, HomeWebService];

@NgModule({
  imports: [
    HttpClientModule,
    NgToolsModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    ...sharedServices,
    UserStore,
    { provide: HTTP_INTERCEPTORS, useClass: InexysHttpInterceptor, multi: true }
  ],
})
export class RestModule {
}
