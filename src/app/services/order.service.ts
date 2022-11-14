import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';
import { Order } from '../interfaces/order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private httpUrl = BaseUrl() + "orders";

  constructor(private http: HttpClient,
    private authService: AuthService) {

  }

  getOrdersByUser(id: number) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });
    return this.http.get(this.httpUrl + '/' + 'customerOrders' + '/' + id,{ headers: { "Authorization": jwt } });
  }

  getOrders() {
    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.get(this.httpUrl, { headers: { "Authorization": jwt } });
  }

  getOrder(id: number) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.get(this.httpUrl + '/' + id,{ headers: { "Authorization": jwt } });
  }

  addOrder(order: Order) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.post(this.httpUrl, order,{ headers: { "Authorization": jwt } });
  }

  updateOrder(order: Order) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.put(this.httpUrl + '/' + order.id, order,{ headers: { "Authorization": jwt } });
  }

  deleteOrder(id: number) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.delete(this.httpUrl + '/' + id,{ headers: { "Authorization": jwt } });
  }
}
