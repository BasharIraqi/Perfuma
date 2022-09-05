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
  currentYear: number = new Date().getFullYear();
  productsCart: Product[] = [];
  isAuth: boolean = true;
  user: User = {} as User;
  hide: boolean = true;
  errorMessage = "";

  constructor(private cartService: ProductsCartService,
    private userService: UsersService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.getCart();

    this.getAuth();

    this.getUser();
  }
  private getUser() {
    this.auth.selectUser$.subscribe(value => {
      this.user = value;
    });
  }

  private getAuth() {
    this.auth.selectAuth$.subscribe(value => {
      this.isAuth = value;
    });
  }

  private getCart() {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    }
    );
  }


  onInputClick() {
    this.hide = true;
  }


  LogOut() {
    this.auth.setAuth(true, this.user);
    this.router.navigate(['/']);
  }

  onSubmit(details: NgForm) {
    this.userService.getUser(details.value).subscribe(
      (data: any) => {
        this.user = data;
        this.auth.setAuth(false, this.user);
        this.router.navigate(['/']);
      }, error => {
        if (error.status == 401) {
          this.errorMessage = "Wrong User or Password";
          this.hide = false;
        }
        if (error.status == 500) {
          this.errorMessage = "User Not Exist";
          this.hide = false;
        }
      }
    )
  }






}
