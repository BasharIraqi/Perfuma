import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth$=new BehaviorSubject<boolean>(true);
  private user$=new BehaviorSubject<User>({}as User);
  private jwt$=new BehaviorSubject<string>("");

  selectAuth$=this.isAuth$.asObservable();
  selectUser$=this.user$.asObservable();
  selectJwt$=this.jwt$.asObservable();
  
  constructor() { 
    
  }

  setAuth(auth:boolean,user:User)
  {
   this.isAuth$.next(auth);
   this.user$.next(user);
  }

  setJwt(jwt:string)
  {
    this.jwt$.next(jwt);
  }
}
