import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  filterOrders: Order[] = [];
  search: string = '';

  constructor(private ordersService: OrderService) {

  }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders() {
    this.ordersService.getOrders().subscribe((data: any) => {
      this.orders = data;
      this.filterOrders = data;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });
  }

  onOrderSearch(e: string) {

    let searchInput: string = e;

    this.filterOrders = this.orders.filter(order => {
      return order.id.toString().includes(searchInput);
    })
  }

}
