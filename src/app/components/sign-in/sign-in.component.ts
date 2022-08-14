import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { UsersService } from 'src/app/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  productsCart: Product[] = [];
  isAuth: boolean = true;
  user: User = {} as User;
 
  constructor(private cartService: ProductsCartService,
    private userService: UsersService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    }
    );
    this.auth.selectAuth$.subscribe(value => {
      this.isAuth = value;
    });
    this.auth.selectUser$.subscribe(value => {
      this.user = value;
    });
  }
  LogOut() {
    this.auth.setAuth(true, this.user);
    this.router.navigate(['/']);
  }

  onSubmit(details: NgForm) {
   try{
    this.userService.getUser(details.value).subscribe((data: any) => {
      this.user = data;
      this.auth.setAuth(false, this.user);
      this.router.navigate(['/']);
    });
   }
    catch(error){
      console.log(error);
    }
  }







}
