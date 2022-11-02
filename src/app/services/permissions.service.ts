import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private showOrders$ = new BehaviorSubject(true);
  selectedShowOrders$ = this.showOrders$.asObservable();

  private showEmployees$ = new BehaviorSubject(true);
  selectedShowEmployees$ = this.showEmployees$.asObservable();

  private showCustomers$ = new BehaviorSubject(true);
  selectedShowCustomers$ = this.showCustomers$.asObservable();

  private showUsers$ = new BehaviorSubject(true);
  selectedShowUsers$ = this.showUsers$.asObservable();

  private showBankAccounts$ = new BehaviorSubject(true);
  selectedShowBankAccounts$ = this.showBankAccounts$.asObservable();

  private showAddresses$ = new BehaviorSubject(true);
  selectedshowAddresses$ = this.showAddresses$.asObservable();

  private showCreditCards$ = new BehaviorSubject(true);
  selectedshowCreditCards$ = this.showCreditCards$.asObservable();

  private showProducts$ = new BehaviorSubject(true);
  selectedshowProducts$ = this.showProducts$.asObservable();

  constructor() {

  }

  setShowOrders(value: boolean) {
    this.showOrders$.next(value);
  }

  setShowCustomers(value: boolean) {
    this.showCustomers$.next(value);
  }

  setShowEmployees(value: boolean) {
    this.showEmployees$.next(value);
  }

  setShowUsers(value: boolean) {
    this.showUsers$.next(value);
  }

  setShowCreditCards(value: boolean) {
    this.showCreditCards$.next(value);
  }
  
  setShowBankAccounts(value: boolean) {
    this.showBankAccounts$.next(value);
  }

  setShowAddresses(value: boolean) {
    this.showAddresses$.next(value);
  }

  setShowProducts(value:boolean){
    this.showProducts$.next(value);
  }
}
