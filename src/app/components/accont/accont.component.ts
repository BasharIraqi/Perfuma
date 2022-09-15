import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { Order } from 'src/app/interfaces/order';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';

@Component({
  selector: 'app-accont',
  templateUrl: './accont.component.html',
  styleUrls: ['./accont.component.css']
})
export class AccontComponent implements OnInit {

  currentYear: number = new Date().getFullYear();
  productsCart: Product[] = [];
  user: User = {} as User;
  orders: Order[] = [];
  isAuth: boolean = false;
  userId: number = 0;
  show: boolean = true;
  customer: Customer = {} as Customer;

  constructor(private cartService: ProductsCartService,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private customerService: CustomerService) {

  }

  ngOnInit(): void {
    this.getCart();

    this.getUserAuth();

    this.getUser();

    this.getUserOrders();

    this.getCustomer();
  }

  onSubmit(details: NgForm) {
    if (details.valid) {
      this.customerService.updateCustomer(this.customer).subscribe((data: any) => {
        this.customer = data;
      },error=>{
        if(error){
          alert(error);
        }
      })
    }
  }

  private getCustomer() {
    this.customerService.getCustomer(this.orders[0].customer.id).subscribe((data: any) => {
      this.customer = data;
    },error=>{
      if(error){
        alert("error");
      }
    });
  }

  onOrderUpdate(order: Order) {
    this.orderService.updateOrder(order).subscribe(data => {
      this.orders.filter(o => {
        if (o.id == order.id) {
          o = order;
        }
      })
      this.getUserOrders();
    }, error => {
      alert("not good");
    })
  }

  private getCart() {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    });
  }

  private getUserAuth() {
    this.authService.selectAuth$.subscribe(data => {
      this.isAuth = data;
    });
  }

  private getUser() {
    this.authService.selectUser$.subscribe(data => {
      this.user = data;
    });
  }

  getUserOrders() {
    this.userId = this.route.snapshot.params['id'];
    this.orderService.getOrdersByUser(this.userId).subscribe((data: any) => {
      this.orders = data;
      if (this.orders.length == 0) {
        this.show = false;
      }
      else {
        this.show = true;
      }
    });
  }


  onOrderDelete(orderId: number) {
    this.orderService.deleteOrder(orderId).subscribe(data => {
      alert(`Your Order number ${orderId} Canceled !!!`)
      this.getUserOrders();
    })


  }

  categoryType(category: number) {
    {
      switch (category) {
        case 0:
          return "Men Perfume";
          break;
        case 1:
          return "Women Perfume";
          break;
        case 2:
          return "Unisex Perfume";
          break;
        case 3:
          return "Men Boutiqe Perfume";
          break;
        case 4:
          return "Women Boutiqe Perfume";
          break;
        case 5:
          return "Unisex Boutiqe Perfume";
          break;
        case 6:
          return "Men Set";
          break;
        case 7:
          return "Women Set";
          break;

        default:
          return "";
      }
    }
  }

}
