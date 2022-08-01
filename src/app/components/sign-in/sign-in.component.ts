import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { Product } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  productsCart: Product[] = [];
  customer: Customer={}as Customer;
  isAuth: boolean=true;
  constructor(private cartService: ProductsCartService,
    private userService: UsersService,
    private router: Router,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    }
    );
    this.auth.selectAuth$.subscribe(value=>
      {
        this.isAuth=value;
      })
  }
  onSubmit(details: NgForm) {
  
  }




}
