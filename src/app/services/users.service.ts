import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '../interfaces/baseUrl';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

   private httpUrl=BaseUrl()+'users';

  constructor(private http:HttpClient) {

   }

   getUsers(){
    return this.http.get(this.httpUrl);
   }

    getUser(user:User){
     return this.http.get(this.httpUrl+'/'+user.email);
    }

    setUser(user:User){
      return this.http.post(this.httpUrl,user);
    }
}
