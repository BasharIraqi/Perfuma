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
import { CustomerService } from 'src/app/services/customer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-paymnet',
  templateUrl: './paymnet.component.html',
  styleUrls: ['./paymnet.component.css']
})
export class PaymnetComponent implements OnInit {
  productsCart: Product[] = [];
  totalPrice: number = 0;
  isAuth: boolean = false;
  modalRef?: BsModalRef;
  order: Order = {} as Order;
  check: boolean = false;
  address: Address = {} as Address;
  creditCard: CreditCard = {} as CreditCard;
  user: User = {} as User;
  customer: Customer = {} as Customer;
  orderNumber: number = 0;
  checkYear: boolean = false;
  res: any;

  constructor(private cartService: ProductsCartService,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService,
    private modalService: BsModalService,
    private customerService: CustomerService) {

  }
  ngOnInit(): void {
    this.getCart();

    this.calculatePrice();

    this.getAuth();

    this.getUser();
  }

  checkExpiredYear(event: any) {

    if (new Date().getFullYear() % 100 < Number(event)) {
      this.checkYear = true;
    }
    else {
      this.checkYear = false;
    }
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
    this.productsCart.forEach(product => {
      this.totalPrice = this.totalPrice + product.price;
    }
    );
  }
  onSubmit(payment: NgForm) {
     console.log(this.order,this.customer,this.creditCard,this.user,this.address);
    let date:Date=new Date();
    date.setDate(date.getDate()+3);
     let pipe = new DatePipe('en-US');
    let arrivaldate=pipe.transform(Date.now(), 'dd/MM/yyyy');

    let orderdate=pipe.transform(date, 'dd/MM/yyyy');
    this.customer.user = this.user;

    if (payment.valid) {
      this.creditCard.firstName = this.customer.firstName;
      this.creditCard.lastName = this.customer.lastName;
      this.customer.address = this.address;
      this.customer.creditCard = this.creditCard;
      this.order.customer = this.customer;
      this.order.arrivalDate = arrivaldate;
      this.order.numberOfProducts = this.productsCart.length;
      this.order.orderDate = orderdate;
      this.order.paymentValue = this.totalPrice;
      this.order.products = this.productsCart;
     

      this.orderService.addOrder(this.order).subscribe((data: any) => {
        this.order.id = data;
        this.router.navigate(['/']);
        this.cartService.setProductsCart([]);
      }, error => {
        if (error) {
          console.log(error);
          this.check = true;
        }
      })
    }
    else {
      this.check = true;
    }
  }

}
