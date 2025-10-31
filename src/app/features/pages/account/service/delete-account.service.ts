import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteAccountResponse } from '../interface/delete-account-response';


@Injectable({
  providedIn: 'root'
})
export class DeleteAccountService {

  constructor(private _http:HttpClient) { }

  deleteAccount():Observable<DeleteAccountResponse>{
    return this._http.delete<DeleteAccountResponse>('auth/deleteMe');
  }
}
