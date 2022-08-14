import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

   private httpUrl='https://localhost:44312/api/users';
  user: any;

  constructor(private http:HttpClient) {

   }

    getUser(user:User){
     return this.http.get(this.httpUrl+'/'+user.email+'/'+user.password);
    }

    setUser(email:string,password:string){
      return this.http.post(this.httpUrl,{email:email,password:password});
    }
}
