import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { HomeWebService } from '@rest/home.webservice';

@Injectable()
export class UserResolve implements Resolve<any> {

  constructor(private homeWebService: HomeWebService) {
  }

  async resolve() {
    return await this.homeWebService.me().toPromise();
  }

}
