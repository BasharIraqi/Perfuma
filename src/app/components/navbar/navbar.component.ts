import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/interfaces/image';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  productsCart: Product[] = [];
  isAuth: boolean = false;
  image: Image = {} as Image;
  user: User = {} as User;
  products: Product[] = [];
  filterProducts: Product[] = [];
  modalRef?: BsModalRef;
  showImage: boolean = false;
  userPicture: any;
  anonymousImage:string='Resources/Images/anonymous.png';

  constructor(private cartService: ProductsCartService,
    private authService: AuthService,
    private router: Router,
    private productService: ProductsService,
    private modalService: BsModalService,
    private imageService: ImageService) {

  }

  ngOnInit(): void {

    this.getCart();

    this.getAuth();

    this.getUser();

    this.getProducts();

    this.getImage();
  }




  public createImgPath = (serverPath: string) => {
    return `https://localhost:44312/${serverPath}`;
  }

  private getImage() {
    console.log(this.user);
    if (this.user.image == null) {
      this.userPicture = this.createImgPath(this.anonymousImage);
      console.log(this.user);
    }
    else if(this.user.image!=null){
      this.imageService.getImage(this.user.image.id).subscribe((data: any) => {
       this.image=data;
       this.userPicture=this.createImgPath(this.image.path);
      },error=>{
        console.log(this.user);
        if(error)
        this.userPicture = this.createImgPath('Resources/Images/anonymous.png');
      })
    }
  }

  private getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filterProducts = data;
    });
  }

  private getUser() {
    this.authService.selectUser$.subscribe(data => {
      this.user = data;
    });
  }

  private getAuth() {
    this.authService.selectAuth$.subscribe(data => {
      this.isAuth = data;
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
