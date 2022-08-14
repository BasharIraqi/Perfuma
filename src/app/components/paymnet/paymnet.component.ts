import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymnet',
  templateUrl: './paymnet.component.html',
  styleUrls: ['./paymnet.component.css']
})
export class PaymnetComponent implements OnInit {
  productsCart: Product[]=[];
  totalPrice: number=0;
  currentYear: number = new Date().getFullYear();
  user: User = {} as User;
  isAuth: boolean = false;

  constructor(private cartService:ProductsCartService,
   private authService:AuthService,
   private router:Router) { 

   }

  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value)=>
    {
     this.productsCart = value;
    }
    );
    this.calculatePrice();
    this.authService.selectAuth$.subscribe((value) => {
      this.isAuth = value;
    });
    this.authService.selectUser$.subscribe((value) => {
      this.user = value;
    });
  }
  LogOut() {
    this.authService.setAuth(true, this.user);
    this.router.navigate(['/']);
  }

  calculatePrice() {
    this.productsCart.forEach(element => {
      this.totalPrice = this.totalPrice + element.price;
    }
    );
  }
  onSubmit(payment:NgForm)
  {
    
  }

}
