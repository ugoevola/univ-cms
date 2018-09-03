import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { HomeWebService } from '@rest/home.webservice';
import { UserStore } from '../store/user.store';

@Injectable()
export class UserResolve implements Resolve<any> {

  constructor(private homeWebService: HomeWebService, private userStore: UserStore) {
  }

  async resolve() {
    const user = await this.homeWebService.me().toPromise();
    this.userStore.setUser(user);
    return user;
  }

}
