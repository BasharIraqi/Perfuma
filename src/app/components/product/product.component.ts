import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product:Product= {} as Product;
  id: number=0;
  currentYear: number = new Date().getFullYear();
  user: User = {} as User;
  isAuth: boolean = false;
  productsCart: Product[] = [];
  

  constructor(private route: ActivatedRoute,
     private productService: ProductsService,
     private authService: AuthService,
     private cartService: ProductsCartService,
     private router: Router) { 
    
  }
  
  ngOnInit(): void {
    this.getProduct();

    this.getAuth();

    this.getUser();

    this.getcart();

  }
  
  private getcart() {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    });
  }

  private getUser() {
    this.authService.selectUser$.subscribe((value) => {
      this.user = value;
    });
  }

  private getAuth() {
    this.authService.selectAuth$.subscribe((value) => {
      this.isAuth = value;
    });
  }

  private getProduct() {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProduct(this.id).subscribe((data: any) => {
      this.product = data;
    }
    );
  }

  LogOut() {
    this.authService.setAuth(true, this.user);
    this.router.navigate(['/']);
  }

}
