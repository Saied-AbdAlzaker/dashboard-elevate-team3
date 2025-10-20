import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddProduct, IProducts, Product } from '../../interfaces/products/products';
import { ICategories } from '../../interfaces/ctegories/categories';
import { IOccasions } from '../../interfaces/occasions/occasions';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  token: string = localStorage.getItem('token') || '';
  constructor(private _http: HttpClient) { }

  allProducts(): Observable<IProducts> {
    return this._http.get<IProducts>(`${environment.apiUrl}/products`);
  }
  allCategories(): Observable<ICategories> {
    return this._http.get<ICategories>(`${environment.apiUrl}/categories`);
  }
  allOccasions(): Observable<IOccasions> {
    return this._http.get<IOccasions>(`${environment.apiUrl}/occasions`);
  }

  getSpecificProduct(id: string): Observable<Product | any> {
    return this._http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  deleteProduct(id: string): Observable<Product> {
    return this._http.delete<Product>(`${environment.apiUrl}/products/${id}`,
      { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdmNjQ3YzVhOTgzMmQ4MzU5ZGRhNzhhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYwMDQwMTgyfQ.Xli_Z9zrIxmOosQ3uq1APGOr8zxpz4sff5cVQmX71Jk` } }
    );
  }

  addProduct(data: IAddProduct | any): Observable<IProducts> {
    return this._http.post<IProducts>(`${environment.apiUrl}/products`, data,
      { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdmNjQ3YzVhOTgzMmQ4MzU5ZGRhNzhhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYwMDQwMTgyfQ.Xli_Z9zrIxmOosQ3uq1APGOr8zxpz4sff5cVQmX71Jk` } },
    );
  }

  updateProduct(id: string, data: IAddProduct | any): Observable<IProducts> {
    return this._http.put<IProducts>(`${environment.apiUrl}/products/${id}`, data,
      { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdmNjQ3YzVhOTgzMmQ4MzU5ZGRhNzhhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYwMDQwMTgyfQ.Xli_Z9zrIxmOosQ3uq1APGOr8zxpz4sff5cVQmX71Jk` } },
    );
  }

}
