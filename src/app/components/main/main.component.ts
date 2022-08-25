import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  products: Product[] = [];
  productsCart: Product[] = [];
  productsNumber: number = 0;
  isAuth: boolean = true;
  hideAlert: boolean = true;
  user: User = {} as User;
  brands: string[] = [];
  filterProducts: Product[] = [];
  categories: number[] = [];



  constructor(private productService: ProductsService,
    private router: Router,
    private cartService: ProductsCartService,
    private auth: AuthService) {

  }


  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    });
    this.GetProducts();
  
    this.auth.selectAuth$.subscribe(value => {
      this.isAuth = value;
    });
    this.auth.selectUser$.subscribe(value => {
      this.user = value;
    });
    this.productService.getBrands().subscribe((data: any) => {
      this.brands = data;
    });
    this.productService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  LogOut() {
    this.auth.setAuth(true, this.user);
    this.router.navigate(['/']);
  }

  private GetProducts(): void {

  this.productService.getProducts().subscribe((data:any)=>{
    this.products=data;
    this.filterProducts=data;
  })

  this.productService.selectedProducts$.subscribe((data)=>{
    this.filterProducts=data;
  })
  
}

  AddProduct(product: Product): void {
    this.productsCart.push(product);
    this.productsNumber = this.productsNumber + 1;
  }

  categoryType(category: number) {
    {
      switch (category) {
        case 0:
          return "Men Perfume";
          break;
        case 1:
          return "Women Perfume";
          break;
        case 2:
          return "Unisex Perfume";
          break;
        case 3:
          return "Men Boutiqe Perfume";
          break;
        case 4:
          return "Women Boutiqe Perfume";
          break;
        case 5:
          return "Unisex Boutiqe Perfume";
          break;
        case 6:
          return "Men Set";
          break;
        case 7:
          return "Women Set";
          break;

        default:
          return "";
      }
    }
  }
}
