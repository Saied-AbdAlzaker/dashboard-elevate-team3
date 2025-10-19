import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TOKEN } from '../../../../../environments/TOKEN';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  TokenAdmin = TOKEN.Admin;
  constructor(private _http:HttpClient) { }

  getCategories():Observable<any> {
    return this._http.get('categories')
  }
  addCategories(form:FormData):Observable<any> {
    return this._http.post('categories',form)
  }

  getCategory(id:string) :Observable<any> {
    return this._http.get(`categories/${id}`);
  }

  updateCategory(id:string,form:FormData):Observable<any>{
    return this._http.put(`categories/${id}`,form,
    {
      headers : { Token : `${this.TokenAdmin}`}
    }
  )
  }
  deleteCategory(id:string):Observable<any>{
    return this._http.delete(`categories/${id}`,
      {
        headers : { Token : `${this.TokenAdmin}`}
      }
    )
  }

}
