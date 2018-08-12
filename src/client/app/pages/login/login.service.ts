import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as HttpStatus from 'http-status-codes';
import { UserStore } from "../../common/store/user.store";
import { share } from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private userStorage: UserStore) {
  }

  login(credential: { email: string, password: string }): Promise<boolean> {
    return this.http.post('/auth/authenticate', credential, { responseType: 'text' })
      .pipe(share())
      .toPromise().then((token: any) => {
        this.userStorage.setToken(token);
        return true;
      }).catch((err) => {
        if (err.status !== HttpStatus.UNAUTHORIZED) {
          // notifier probleme connexion
        }
        return false;
      });
  }
}
