
import { throwError as observableThrowError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { InexysNotificationService } from '../ngtools/notification/notification.service';
import { environment } from '@environments/environment';
import { UserStore } from '../store/user.store';
import { Router } from '@angular/router';
import * as HttpStatus from 'http-status-codes';

@Injectable()
export class InexysHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private inexysNotificationService: InexysNotificationService,
    private userStore: UserStore,
    private errorHandler: ErrorHandler) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addAuthentication(req);
    return next.handle(req).pipe(tap(evt => {
      if (evt instanceof HttpResponse) {
        this.inexysNotificationService.showSuccess('Request ' + evt.status);
        if (evt.status === HttpStatus.UNAUTHORIZED) {
          // 401 on redirigine sur la page de login
          this.router.navigateByUrl('/login');
        }
      }
    }), catchError((err) => {
      this.errorHandler.handleError(err);
      return observableThrowError(err);
    }));
  }

  addAuthentication(req: HttpRequest<any>): HttpRequest<any> {
    const headers: any = {};
    const authToken = this.userStore.getToken();
    if (authToken) {
      headers[environment.AUTH_TOKEN_NAME] =
        req = req.clone({
          setHeaders: headers
        });
    }
    return req;
  }
}
