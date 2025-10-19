import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddProduct, IProducts } from '../../interfaces/products/products';
import { ICategories } from '../../interfaces/ctegories/categories';
import { IOccasions } from '../../interfaces/occasions/occasions';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  token: string = localStorage.getItem('token') || '';
  constructor(private _http: HttpClient) { }

  allProducts(): Observable<IProducts> {
    return this._http.get<IProducts>(`https://flower.elevateegy.com/api/v1/products`);
  }
  allCategories(): Observable<ICategories> {
    return this._http.get<ICategories>(`https://flower.elevateegy.com/api/v1/categories`);
  }
  allOccasions(): Observable<IOccasions> {
    return this._http.get<IOccasions>(`https://flower.elevateegy.com/api/v1/occasions`);
  }

  getSpecificProduct(id: string): Observable<any> {
    return this._http.get(`https://flower.elevateegy.com/api/v1/products/${id}`);
  }

  deleteProduct(id: string): Observable<any> {
    return this._http.delete(`https://flower.elevateegy.com/api/v1/products/${id}`,
      { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdmNjQ3YzVhOTgzMmQ4MzU5ZGRhNzhhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYwMDQwMTgyfQ.Xli_Z9zrIxmOosQ3uq1APGOr8zxpz4sff5cVQmX71Jk` } }
    );
  }

  addProduct(data: IAddProduct|any): Observable<IProducts> {
    return this._http.post<IProducts>(`https://flower.elevateegy.com/api/v1/products`, data,
      { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdmNjQ3YzVhOTgzMmQ4MzU5ZGRhNzhhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYwMDQwMTgyfQ.Xli_Z9zrIxmOosQ3uq1APGOr8zxpz4sff5cVQmX71Jk` } },
    );
  }

  updateProduct(id: string, data: IAddProduct|any): Observable<IProducts> {
    return this._http.put<IProducts>(`https://flower.elevateegy.com/api/v1/products/${id}`, data,
      { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdmNjQ3YzVhOTgzMmQ4MzU5ZGRhNzhhIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYwMDQwMTgyfQ.Xli_Z9zrIxmOosQ3uq1APGOr8zxpz4sff5cVQmX71Jk` } },
    );
  }

}
