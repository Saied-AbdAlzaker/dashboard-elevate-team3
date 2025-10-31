import {TOKEN} from '../../../environments/TOKEN';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiEndPoint } from '../../../environments/ApiEndPoint';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {

  // const baseUrl: string = environment.apiUrl;

  // // JUST TEST
  // const TokenUser = TOKEN.User;
  // const TokenAdmin = TOKEN.Admin;

<<<<<<< HEAD
  // let PLATFORM = inject(PLATFORM_ID);

  // if (isPlatformBrowser(PLATFORM)) {
  //   const token = localStorage.getItem('token') || '';

  //   req = req.clone({
  //     url: `${baseUrl}${req.url}`,
  //     setHeaders: {
  //       Authorization: `Bearer ${TokenUser}` 
  //     }
  //   });
  // }

  // return next(req);

  // --------------------------
  const baseUrl = environment.apiUrl;
  const PLATFORM = inject(PLATFORM_ID);

  if (isPlatformBrowser(PLATFORM)) {
    // Get tokens
    const userToken = localStorage.getItem('userToken') || '';
    const adminToken = localStorage.getItem('adminToken') || '';
=======
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

  if(req.method!=='GET')  {
     req = req.clone({
      url: `${baseUrl}${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${TokenAdmin}`
      }
    });
  }

  else if (isPlatformBrowser(PLATFORM)) {
    const token = localStorage.getItem('token') || '';
>>>>>>> b1439bb2946d9746ced0415a5bddcc817aaf892f

    let token = '';

    // 🧠 Decide which token to use based on the request URL or endpoint
    if (req.url.includes('/dashboard')) {
      token = adminToken;
    } else {
      token = userToken;
    }

    // 🛠 Clone request and add token + base URL
    req = req.clone({
      url: `${baseUrl}${req.url}`,
      setHeaders: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
  }

  return next(req);
};
