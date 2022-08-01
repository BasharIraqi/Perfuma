import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { Product } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  productsCart: Product[]=[];
  customer : Customer = {} as Customer;
   currentYear: number = new Date().getFullYear();
   isAuth:boolean=true;
  constructor(private cartService:ProductsCartService,
    private router:Router,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value)=>
    {
     this.productsCart = value;
    });
    this.auth.selectAuth$.subscribe(value=>
      {
        this.isAuth=value;
      })
  }
  onSubmit(details:NgForm)
  {
    this.router.navigate(['/cart']);
    this.auth.setAuth(false,this.customer);
  }

}
