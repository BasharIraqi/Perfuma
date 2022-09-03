
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { UsersService } from 'src/app/services/users.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  productsCart: Product[] = [];
  user: User = { roles: 3 } as User;
  currentYear: number = new Date().getFullYear();
  isAuth: boolean = true;
  modalRef?: BsModalRef;
  message: string = '';

  constructor(private cartService: ProductsCartService,
    private router: Router,
    private auth: AuthService,
    private userService: UsersService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    });
    this.auth.selectAuth$.subscribe(value => {
      this.isAuth = value;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  LogOut() {
    this.auth.setAuth(true, this.user);
    this.router.navigate(['/main']);
  }
  onSubmit(details: NgForm) {
    this.userService.setUser(details.value).subscribe((data: any) => {
      if(details.valid){
        this.user = data;
        this.message = "user created succesfully";
        this.router.navigate(['/logIn']);
      }
    }, error => {
      if (details.invalid) {
        this.message = 'one or more inputs is not valid';
        details.reset();
      }
      else if (error.status == 400) {
        this.message = 'User exists please log in';
        details.reset();
      }
    })

  }

}
