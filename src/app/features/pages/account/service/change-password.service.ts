import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordResponse } from '../interface/change-password-response';



@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private _http:HttpClient) { }

  changePassword(data:any): Observable<ChangePasswordResponse>{
    return this._http.patch<ChangePasswordResponse>('auth/change-password',data);
  }
}
