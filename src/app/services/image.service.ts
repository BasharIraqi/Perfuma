import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  httpUrl=BaseUrl()+'users/GetImage';

  constructor(private http:HttpClient) {

   }

   getImage(id:number){
   return this.http.get(this.httpUrl+'/'+id);
   }
}
