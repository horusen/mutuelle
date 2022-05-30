import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(public router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('intercept');

    return next.handle(request).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          if (error.status == 403) this.router.navigate(['not-found']);
        },
      })
    );
  }
}
