import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  productsCart: Product[] = [];
  isAuth: boolean = false;
  user: User = {} as User;
  products: Product[] = [];
  filterProducts: Product[] = [];
  modalRef?: BsModalRef;
  showImage: boolean = false;
  userPicture: string='';
  anonymousImage: string = 'Resources/Images/anonymous.png';
  IsEmployee:boolean=false;

  constructor(private cartService: ProductsCartService,
    private authService: AuthService,
    private router: Router,
    private productService: ProductsService,
    private modalService: BsModalService) {

  }

  ngOnInit(): void {

    this.getCart();

    this.getAuth();

    this.getUser();

    this.getProducts();
    
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44312/${serverPath}`;
  }

   getImage(imagePath:string) {
  
    if (imagePath == null) {
      return this.createImgPath(this.anonymousImage);
    }
   
     return this.createImgPath(imagePath);
    
  }

  private getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filterProducts = data;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });
  }

  private getUser() {
    this.authService.selectUser$.subscribe(data => {
      this.user = data;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });
  }

  private getAuth() {
    this.authService.selectAuth$.subscribe(data => {
      this.isAuth = data;
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onClickNo() {
    this.modalService.hide();
  }

  onClickYes() {
    this.modalService.hide();
    this.authService.setAuth(true, this.user);
    this.cartService.setProductsCart([]);
    this.router.navigate(['/']);
  }

}
