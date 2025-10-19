import {TOKEN} from '../../../environments/TOKEN';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiEndPoint } from '../../../environments/ApiEndPoint';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {

  const baseUrl: string = environment.apiUrl;

  // JUST TEST
  const TokenUser = TOKEN.User;
  const TokenAdmin = TOKEN.Admin;

  let PLATFORM = inject(PLATFORM_ID);
  const normalUserEndpoints :string[]=[ApiEndPoint.LOW_STOCK_PRODUCTS,ApiEndPoint.STATISTICS_ORDERS,ApiEndPoint.TOP_SELLING_PRODUCTS];
  console.log(req.url);
  if(normalUserEndpoints.includes(req.url)){

    req = req.clone({
      url: `${baseUrl}${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${TokenUser}`
      }
    });
  }
  if(req.url.includes('categories') ) {
     req = req.clone({
      url: `${baseUrl}${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${TokenAdmin}`
      }
    });
  }

  else if (isPlatformBrowser(PLATFORM)) {
    const token = localStorage.getItem('token') || '';

    req = req.clone({
      url: `${baseUrl}${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${TokenUser}`
      }
    });

    /*if (token !== null) {
      req = req.clone({
        url: `${baseUrl}${req.url}`,
        setHeaders: {
          Authorization: `Bearer ${Token}`
        }
      });
    }*/
  }

  return next(req);
};
