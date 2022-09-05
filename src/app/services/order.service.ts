import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private httpUrl=BaseUrl()+"orders";
  
  constructor(private http:HttpClient) { 

  }

  getOrdersByUser(id:number){
    return this.http.get(this.httpUrl+'/'+'customerOrders'+'/'+id);
  }
  getOrders(){
    return this.http.get(this.httpUrl);
  }
  getOrder(id:number){
    return this.http.get(this.httpUrl+'/'+id);
  }
  addOrder(order:Order){
    return this.http.post(this.httpUrl+'/',order);
  }
  updateOrder(order:Order){
    return this.http.put(this.httpUrl+'/'+order.id,order);
  }
  deleteOrder(id:number){ 
    return this.http.delete(this.httpUrl+'/'+id);
  }
}
