
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  productsCart: Product[] = [];
  user: User = {} as User;
  isAuth: boolean = true;
  modalRef?: BsModalRef;
  message: string = '';
  response: any;
  customer: Customer = {} as Customer;

  constructor(private cartService: ProductsCartService,
    private router: Router,
    private authservice: AuthService,
    private customerService: CustomerService,
    private modalService: BsModalService) { }

  ngOnInit(): void {

    this.getCart();

    this.getAuth();

  }

  uploadFinished = (event: any) => {
    this.response = event;
  }

  private getAuth() {
    this.authservice.selectAuth$.subscribe(value => {
      this.isAuth = value;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });
  }

  private getCart() {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(details: NgForm) {

    this.user.role = 3;
    if (this.response != null) {
      this.user.imagePath = this.response.dbPath;
    }
    else {
      this.user.imagePath = '';
    }
    this.customer.user = this.user;
    this.customer.firstName = this.user.firstName;
    this.customer.lastName = this.user.lastName;
    this.customer.email = this.user.email;



    if (details.valid) {
      this.customerService.addCustomer(this.customer).subscribe((data: any) => {
        if (data>0) {
          this.message = "Customer created succesfully";
          this.router.navigate(['/logIn']);
          setTimeout(() => this.modalService.hide(), 2000);
        }
        else {
          this.message = 'Customer exists please log in';
          details.reset();
          this.router.navigate(['/logIn']);
          setTimeout(() => this.modalService.hide(), 2000);
        }
      }, (error: HttpErrorResponse) => {
        if (error)
          this.message='Error in adding customer';
      });
    }
    else if (details.invalid) {
      this.message = 'one or more inputs is not valid';
    }

  }

}
