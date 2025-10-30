import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadPhotoResponse } from '../interface/upload-photo-response';



@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {

  constructor(private _http: HttpClient) { }

  uploadPhoto(data: FormData) :Observable<UploadPhotoResponse>{
    return this._http.put<UploadPhotoResponse>('auth/upload-photo', data);
  }
}
