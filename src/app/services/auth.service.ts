import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth$=new BehaviorSubject<boolean>(true);
  private customer$=new BehaviorSubject<User>({}as User);
  selectAuth$=this.isAuth$.asObservable();
  selectCustomer$=this.customer$.asObservable();

  
  constructor() { }

  setAuth(auth:any,user:User)
  {
   this.isAuth$.next(auth);
   this.customer$.next(user);
  }
}
