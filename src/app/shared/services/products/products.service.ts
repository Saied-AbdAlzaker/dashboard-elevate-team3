import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddProduct, IProducts, Product } from '../../interfaces/products/products';
import { ICategories } from '../../interfaces/ctegories/categories';
import { IOccasions } from '../../interfaces/occasions/occasions';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  allProducts(): Observable<IProducts> {
    return this._http.get<IProducts>(`products`);
  }
  allCategories(): Observable<ICategories> {
    return this._http.get<ICategories>(`categories`);
  }
  allOccasions(): Observable<IOccasions> {
    return this._http.get<IOccasions>(`occasions`);
  }

  getSpecificProduct(id: string): Observable<any> {
    return this._http.get(`products/${id}`);
  }

  deleteProduct(id: string): Observable<any> {
    return this._http.delete(`products/${id}`);
  }

  addProduct(data: IAddProduct |any): Observable<IProducts> {
    return this._http.post<IProducts>(`products`, data);
  }

  updateProduct(id: string, data: IAddProduct |any): Observable<IProducts> {
    return this._http.put<IProducts>(`products/${id}`, data);
  }

}
