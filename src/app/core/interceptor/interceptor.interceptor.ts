import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const excludedEndpoints = ['/login', '/register'];

    if (excludedEndpoints.some((endpoint) => request.url.endsWith(endpoint))) {
      return next.handle(request);
    }

    const authToken = localStorage.getItem('auth_token');

    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });

    // return next.handle(authReq);
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_email');
          localStorage.removeItem('user_role');
          localStorage.removeItem('user_product_group');

          if (localStorage.getItem('auth_token') === null) {
            this.router.navigate(['/auth/login']);
          }
        }
        // Use throwError as a function that returns an Observable
        return throwError(() => error);
      })
    );
  }
}
