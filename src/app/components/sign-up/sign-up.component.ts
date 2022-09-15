
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
  user: User = {} as User;
  currentYear: number = new Date().getFullYear();
  isAuth: boolean = true;
  modalRef?: BsModalRef;
  message: string = '';
  response: any;
  

  constructor(private cartService: ProductsCartService,
    private router: Router,
    private authservice: AuthService,
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
    this.authservice.selectAuth$.subscribe(value => {
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
    this.user=details.value;
    this.user.role=3;
    this.user.imagePath=this.response.dbPath;
    this.userService.setUser(this.user).subscribe((data: any) => {
      if(details.valid){
        this.user = data;
        this.message = "user created succesfully";
        this.router.navigate(['/logIn']);
       setTimeout(()=> this.modalService.hide(),3000);
      }
    }, error => {
      if (error.status == 400) {
        this.message = 'User exists please log in';
      }
      else if (details.invalid || error) {
         this.message = 'one or more inputs is not valid';
       }
    })

  }

}
