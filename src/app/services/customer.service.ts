import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';
import { Customer } from '../interfaces/customer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private httpUrl = BaseUrl() + "customers";

  constructor(private http: HttpClient,
    private authService: AuthService) {

  }

  getCustomers() {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.get(this.httpUrl, { headers: { "Authorization": jwt } });
  }

  getCustomer(id: number) {
    
    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });
  
    return this.http.get(this.httpUrl + '/' + id, { headers: { "Authorization": jwt } });
  }

  updateCustomer(customer: Customer) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });
    
    return this.http.put(this.httpUrl + '/' + customer.id, customer, { headers: { "Authorization": jwt } });
  }

  addCustomer(customer: Customer) {
    return this.http.post(this.httpUrl, customer);
  }

  GetCustomerByUserId(id: number) {
    
    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });
    

    return this.http.get(this.httpUrl + '/' + 'GetCustomerByUserId' + '/' + id,{ headers: { "Authorization": jwt } });
  }
}
