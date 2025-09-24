import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this._http.get(`https://flower.elevateegy.com/api/v1/products`);
  }
}
