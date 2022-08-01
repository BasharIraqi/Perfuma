import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../interfaces/customer';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth$=new BehaviorSubject<boolean>(true);
  private customer$=new BehaviorSubject<Customer>({}as Customer);
  selectAuth$=this.isAuth$.asObservable();
  selectCustomer$=this.customer$.asObservable();

  
  constructor() { }

  setAuth(auth:any,customer:Customer)
  {
   this.isAuth$.next(auth);
   this.customer$.next(customer);
  }
}
