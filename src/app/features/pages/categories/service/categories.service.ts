import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TOKEN } from '../../../../../environments/TOKEN';
import { ResponseCategories } from '../interface/response-categories';
import { ResponseAddCategory } from '../interface/response-add-category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  TokenAdmin = TOKEN.Admin;
  constructor(private _http:HttpClient) { }

  getCategories():Observable<ResponseCategories> {
    return this._http.get<ResponseCategories>('categories')
  }
  addCategories(form:FormData):Observable<ResponseAddCategory> {
    return this._http.post<ResponseAddCategory>('categories',form)
  }

  getCategory(id:string) :Observable<ResponseAddCategory> {
    return this._http.get<ResponseAddCategory>(`categories/${id}`);
  }

  updateCategory(id:string,form:FormData):Observable<ResponseAddCategory>{
    return this._http.put<ResponseAddCategory>(`categories/${id}`,form,

  )
  }
  deleteCategory(id:string):Observable<ResponseCategories>{
    return this._http.delete<ResponseCategories>(`categories/${id}`,

    )
  }

}
