import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  
  currentYear: number = new Date().getFullYear();
  user:User={} as User;
  isAuth: boolean = false;
  productsCart:Product[]=[];

  constructor(private authServise:AuthService,
  private cart:ProductsCartService,
  private router:Router) { 

   }

   

  ngOnInit(): void {
    this.getAuth();

    this.getUser();
    
    this.getCart();
  }
  private getCart() {
    this.cart.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    });
  }

  private getUser() {
    this.authServise.selectUser$.subscribe((value) => {
      this.user = value;
    });
  }

  private getAuth() {
    this.authServise.selectAuth$.subscribe((value) => {
      this.isAuth = value;
    });
  }

  LogOut()
  {
    this.authServise.setAuth(true,this.user);
    this.router.navigate(['/']);
  }
  onSubmit(details:NgForm){
    if(details.valid)
    {
      alert("Thank you for your message!");
      this.router.navigate(['/']);
    }
    else{
      alert("Please fill all the fields accordingly!");
    }
  }


}
