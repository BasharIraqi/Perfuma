import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';

@Component({
  selector: 'app-delivery-arrangements',
  templateUrl: './delivery-arrangements.component.html',
  styleUrls: ['./delivery-arrangements.component.css']
})
export class DeliveryArrangementsComponent implements OnInit {
 
  currentYear: number = new Date().getFullYear();
  user:User={} as User;
  isAuth: boolean = false;
  productsCart:Product[]=[];
  constructor(private authService:AuthService,
    private cart:ProductsCartService,
    private router:Router) { 

   }

  ngOnInit(): void {
    this.authService.selectAuth$.subscribe((value) => {
      this.isAuth = value;
    });
    this.authService.selectUser$.subscribe((value) => {
      this.user = value;
    });
    this.cart.selectedProduct$.subscribe((value)=>
    {
      this.productsCart = value;
    });
  }
  LogOut() {
    this.authService.setAuth(true, this.user);
    this.router.navigate(['/']);
  }

}
