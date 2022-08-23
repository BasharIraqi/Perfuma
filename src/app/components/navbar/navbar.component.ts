import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  productsCart: Product[]=[];
  isAuth: boolean=false;
  user: User={}as User;
  products: Product[]=[];
  filterProducts: Product[]=[];
  
  constructor(private cartService:ProductsCartService,
    private authService:AuthService,
    private router:Router,
    private productService: ProductsService) { 

   }

  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    });
    this.authService.selectAuth$.subscribe(data=>{
      this.isAuth=data
    });
    this.authService.selectUser$.subscribe(data=>{
      this.user=data
    });
   
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filterProducts = data;
    });
  }
  
  LogOut() {
    this.authService.setAuth(true, this.user);
    this.router.navigate(['/']);
  }

}
