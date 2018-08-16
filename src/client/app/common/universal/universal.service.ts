import { Injectable, PLATFORM_ID, Inject, Injector } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class UniversalService {

  constructor(@Inject(PLATFORM_ID) private platformId: any, private injector: Injector) {
  }

  isClient() {
    return !isPlatformServer(this.platformId);
  }

  isServer() {
    return isPlatformServer(this.platformId);
  }

  getBaseUrl() {
    return this.injector.get('request').BASE_URL;
  }

  getRequestParams() {
    return this.injector.get('request');
  }

}
