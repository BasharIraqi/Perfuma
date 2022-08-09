import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
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
  searchInput: string = '';
  hideAlert: boolean = true;
  user: User = {} as User;

  constructor(private productService: ProductsService,
    private orderService: OrderService,
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
    this.auth.selectCustomer$.subscribe(value => {
      this.user = value;
    });

  }
  onInputClick(): void {
    if (this.searchInput == "No results found") {
      this.searchInput = '';
      this.GetProducts();
    }
  }
  onChange(event: any) {
    this.searchInput = event;
    if (this.searchInput == '')
      this.GetProducts();
    else {
      let searchResult = this.products.filter((value) => {
        return value.name.toLowerCase().includes(this.searchInput.toLowerCase()) || value.description.toLowerCase().includes(this.searchInput.toLowerCase());
      })

      if (searchResult.length == 0)
        this.GetProducts();

      else
        this.products = searchResult;
    }
  }
  onSearch(value: NgForm) {
    let res = value.value.input;
    let searchResult = this.products.filter((value) => {
      return value.name.toLowerCase().includes(res.toLowerCase()) || value.description.toLowerCase().includes(this.searchInput.toLowerCase());
    }
    )
    if (searchResult.length == 0) {
      this.searchInput = "No results found";
    }
    else
      this.products = searchResult;
  }
  LogOut() {
    this.auth.setAuth(true, this.user);
    this.router.navigate(['/main']);
  }
  private GetProducts(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
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
