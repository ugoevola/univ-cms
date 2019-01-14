
import { throwError as observableThrowError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class UcmsHttpInterceptor implements HttpInterceptor {

  constructor(private errorHandler: ErrorHandler) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(evt => {
      if (evt instanceof HttpResponse) {
        // DO SOMETHING
      }
    }), catchError((err) => {
      this.errorHandler.handleError(err);
      return observableThrowError(err);
    }));
  }
}
