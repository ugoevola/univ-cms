

import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UcmsHttpInterceptor } from './http.interceptor';
import { NgToolsModule } from '../ngtools/ngtools.module';
import { UserStore } from '../store/user.store';
import { ContentWebService } from '@rest/content.webservice';
import { HomeWebService } from '@rest/home.webservice';
import { RequestWebService } from '@rest/request.webservice';

const sharedServices = [ContentWebService, HomeWebService, RequestWebService];

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
    { provide: HTTP_INTERCEPTORS, useClass: UcmsHttpInterceptor, multi: true }
  ],
})
export class RestModule {
}
