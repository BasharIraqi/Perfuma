import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Order } from 'src/app/interfaces/order';
import { Address } from 'src/app/interfaces/address';
import { CreditCard } from 'src/app/interfaces/creditCard';
import { Customer } from 'src/app/interfaces/customer';

@Component({
  selector: 'app-paymnet',
  templateUrl: './paymnet.component.html',
  styleUrls: ['./paymnet.component.css']
})
export class PaymnetComponent implements OnInit {
  productsCart: Product[] = [];
  totalPrice: number = 0;
  user: User = {} as User;
  isAuth: boolean = false;
  modalRef?: BsModalRef;
  orderId: number = 0;
  check: boolean = false;
  address:Address={}as Address;
  creditCard:CreditCard={} as CreditCard;
  customer:Customer={address:this.address}as Customer;


  constructor(private cartService: ProductsCartService,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService,
    private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.getCart();

    this.calculatePrice();

    this.getAuth();

    this.getUser();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private getUser() {
    this.authService.selectUser$.subscribe((value) => {
      this.user = value;
    });
  }

  private getAuth() {
    this.authService.selectAuth$.subscribe((value) => {
      this.isAuth = value;
    });
  }

  private getCart() {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    }
    );
  }

  calculatePrice() {
    this.productsCart.forEach(element => {
      this.totalPrice = this.totalPrice + element.price;
    }
    );
  }
  onSubmit(payment: NgForm) {
    let date: Date = new Date();
    date.setDate(date.getDate() + 3);

    if (payment.valid) {
      let order: Order = {
        id:0,
        products: this.productsCart,
        arrivalDate: date,
        orderDate: new Date(),
        customer: this.customer,
        numberOfProducts: this.productsCart.length,
        paymentValue: this.totalPrice
      }
      this.orderService.addOrder(order).subscribe((data: any) => {
        this.orderId = data
      }, error => {
        if (error.status == 404)
          this.check = true;
      })
    }
    else {
      this.check = true;
    }
  }

}
