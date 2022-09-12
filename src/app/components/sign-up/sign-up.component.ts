
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { UsersService } from 'src/app/services/users.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Image } from 'src/app/interfaces/image';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  productsCart: Product[] = [];
  user: User = { roles: 3} as User;
  currentYear: number = new Date().getFullYear();
  isAuth: boolean = true;
  modalRef?: BsModalRef;
  message: string = '';
  response: any;
  image: Image={}as Image;
  

  constructor(private cartService: ProductsCartService,
    private router: Router,
    private auth: AuthService,
    private userService: UsersService,
    private modalService: BsModalService) { }

  ngOnInit(): void {

    this.getCart();

    this.getAuth();
    
  }

  uploadFinished = (event:any) => { 
    this.response = event; 
  }
 
  private getAuth() {
    this.auth.selectAuth$.subscribe(value => {
      this.isAuth = value;
    });
  }

  private getCart() {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(details: NgForm) {
    this.image.path=this.response.dbPath;
    this.user.image=this.image;
   
    this.userService.setUser(details.value).subscribe((data: any) => {
      if(details.valid){
        this.user = data;
        this.message = "user created succesfully";
        this.router.navigate(['/logIn']);
        this.modalService.hide();
      }
    }, error => {
      if (details.invalid || error) {
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
