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

  // token: string = localStorage.getItem('token') || '';
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

  getSpecificProduct(id: string): Observable<Product | any> {
    return this._http.get<Product>(`products/${id}`);
  }

  deleteProduct(id: string): Observable<Product> {
    return this._http.delete<Product>(`products/${id}`,
      { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdmNjQ3YzVhOTgzMmQ4MzU5ZGRhNzhhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYxMTUzMTU4fQ.5Q8qc4Jawka-aBZIUkAXtMaF6_nFGpOwIlskOxYtBw8` } }
    );
  }

  addProduct(data: IAddProduct | any): Observable<IProducts> {
    return this._http.post<IProducts>(`products`, data,
      { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdmNjQ3YzVhOTgzMmQ4MzU5ZGRhNzhhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYxMTUzMTU4fQ.5Q8qc4Jawka-aBZIUkAXtMaF6_nFGpOwIlskOxYtBw8` } },
    );
  }

  updateProduct(id: string, data: IAddProduct | any): Observable<IProducts> {
    return this._http.put<IProducts>(`products/${id}`, data,
      { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdmNjQ3YzVhOTgzMmQ4MzU5ZGRhNzhhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYxMTUzMTU4fQ.5Q8qc4Jawka-aBZIUkAXtMaF6_nFGpOwIlskOxYtBw8` } },
    );
  }

}
