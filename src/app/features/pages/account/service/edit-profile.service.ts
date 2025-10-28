import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditProfileResponse } from '../interface/edit-profile-response';



@Injectable({
  providedIn: 'root'
})
export class EditProfileService {



  constructor(private _http:HttpClient) { }

  editProfile() :Observable<EditProfileResponse>{
    // let last_Name = typeof window !== 'undefined'? localStorage.getItem('Rose_LastName') : '';

    return this._http.put<EditProfileResponse>('auth/editProfile',
      {lastName:"Espinoza"}
    );

  }
}
