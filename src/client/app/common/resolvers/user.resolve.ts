import { Resolve } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';

@Injectable()
export class UserResolve implements Resolve<any> {

  constructor(private http: HttpClient) {
  }

  resolve() {
    return this.http.get('/api/me').pipe(share()).subscribe((user: any) => {
      return user;
    });
  }

}
