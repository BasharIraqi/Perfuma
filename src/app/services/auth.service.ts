import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth$=new BehaviorSubject<boolean>(true);
  private user$=new BehaviorSubject<User>({}as User);
  selectAuth$=this.isAuth$.asObservable();
  selectUser$=this.user$.asObservable();

  
  constructor() { }

  setAuth(auth:any,user:User)
  {
   this.isAuth$.next(auth);
   this.user$.next(user);
  }
}
