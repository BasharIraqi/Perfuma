import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private httpUrl=BaseUrl()+"customers";
  
  constructor(private http:HttpClient) {

   }

   getCustomers(){
   return this.http.get(this.httpUrl);
   }

   getCustomer(id:number){
    return this.http.get(this.httpUrl+'/'+id);
   }

   updateCustomer(customer:Customer){
    return this.http.put(this.httpUrl+'/'+customer.id,customer);
   }

   addCustomer(customer:Customer){
    return this.http.post(this.httpUrl,customer);
   }
}
