import { Injectable } from '@angular/core';
import { AsiLocalStorageService } from '@asi-ngtools/lib';
import { environment } from '@environments/environment';

@Injectable()
export class UserStore {

  private user: any;

  constructor(private asiLocalStorage: AsiLocalStorageService) {
  }

  getUser() {
    return this.user;
  }

  setUser(user: any) {
    this.user = user;
  }

  getToken() {
    return this.asiLocalStorage.getItem(environment.AUTH_TOKEN_NAME);
  }

  setToken(token: string) {
    this.asiLocalStorage.setItem(environment.AUTH_TOKEN_NAME, token);
  }
}
