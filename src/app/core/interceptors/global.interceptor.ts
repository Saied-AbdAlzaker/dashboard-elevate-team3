import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  if (req.url.includes('/i18n/')) {
    return next(req);
  }

  let headers: Record<string, string> = {};

  const hasWindow = typeof window !== 'undefined';
  const token = hasWindow ? localStorage.getItem('token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['token'] = token;
  }

  const lang: string = (hasWindow ? localStorage.getItem('lng') : null) || 'en';
  headers['language'] = lang;
  // Inject baseUrl + headers
  const modifiedReq: HttpRequest<unknown> = req.clone({
    url: `${req.url}`,
    setHeaders: headers
  });

  return next(modifiedReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (hasWindow) {
          localStorage.removeItem('token');
        }
        router.navigateByUrl('/');
      }
      return throwError(() => error);
    })
  );
};
