import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {

  let platform = inject(PLATFORM_ID);

  const baseUrl: string = environment.apiUrl;
  const token = localStorage.getItem('token') || '';

  if (isPlatformBrowser(platform)) {
    if (token !== null) {
      req = req.clone({
        url: `${baseUrl}${req.url}`,
        setHeaders: {
          token: `${token}`
        }
      });
    }
  }

  return next(req);
};
