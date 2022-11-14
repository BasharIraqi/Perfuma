import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentYear: number = new Date().getFullYear();
  productsCart: Product[] = [];
  totalPrice: number = 0;
  isAuth: boolean = false;
  user: User = {} as User;

  constructor(
    private cartService: ProductsCartService,
    private router: Router,
    private authService: AuthService) {

  }

  ngOnInit(): void {

    this.getCart();

    this.calculatePrice();

    this.getAuth();

    this.getUser();

  }
  
  onClick(){
    if(!this.isAuth){
      this.router.navigate(['/payment']);
    }
    else{
      this.router.navigate(['/logIn']);
    }
  }

  private getUser() {
    this.authService.selectUser$.subscribe(data => {
      this.user = data;
    },(error:HttpErrorResponse)=>{
      return;
    });
  }

  private getAuth() {
    this.authService.selectAuth$.subscribe(data => {
      this.isAuth = data;
    },(error:HttpErrorResponse)=>{
      return;
    });
  }

  private getCart() {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;

    },(error:HttpErrorResponse)=>{
      return;
    });
  }

  calculatePrice() {
    this.productsCart.forEach(element => {
      this.totalPrice = this.totalPrice + element.price;
    });
  }
  
  deleteProduct(product: Product) {
    this.productsCart.indexOf(product) > -1 ? this.productsCart.splice(this.productsCart.indexOf(product), 1) : null;
    this.cartService.setProductsCart(this.productsCart);
    this.totalPrice = this.totalPrice - product.price;
  }

  categoryType(category: number) {
    {
      switch (category) {
        case 0:
          return "Men Perfume";
       
        case 1:
          return "Women Perfume";
         
        case 2:
          return "Unisex Perfume";
         
        case 3:
          return "Men Boutiqe Perfume";
       
        case 4:
          return "Women Boutiqe Perfume";
        
        case 5:
          return "Unisex Boutiqe Perfume";
         
        case 6:
          return "Men Set";
        
        case 7:
          return "Women Set";

        default:
          return "";
      }


    }
  }

}
