import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  productsCart: Product[] = [];
  isAuth: boolean = true;
  user: User = {} as User;
  hide: boolean = true;
  errorMessage = "";
  jwt: string = '';

  constructor(private cartService: ProductsCartService,
    private userService: UsersService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.getCart();

    this.getAuth();

    this.getUser();

  }
  private getUser() {
    this.authService.selectUser$.subscribe(value => {
      this.user = value;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });
  }

  private getAuth() {
    this.authService.selectAuth$.subscribe(value => {
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
  onInputClick() {
    this.hide = true;
  }


  onSubmit(details: NgForm) {

    this.userService.checkUser(details.value).subscribe((data: any) => {

      this.authService.setJwt("Bearer " + data.token);
      
      
    }, (err: HttpErrorResponse) => {
      if (err.status == 401) {
        this.router.navigate(['/pageNotAuthorized']);
      }
      else {
        this.errorMessage = "Wrong User or Password";
        this.hide = false;
      }
    })
    this.findUser(details);
    
    if (this.user.role == 0) {
      this.errorMessage = "Invalid User"
      this.hide = false;
      return;
    }

    if (this.productsCart.length > 0) {
      this.router.navigate(['/payment']);
    }
    else {
      this.router.navigate(['/']);
    }
  }

  private findUser(details: NgForm) {
    this.userService.getUser(details.value).subscribe((data: any) => {
      this.user = data;
      this.authService.setAuth(false, this.user);

    }, (error: HttpErrorResponse) => {
      if (error) {
        this.errorMessage = "User Not Exist";
        this.hide = false;
      }
    });
  }
}
