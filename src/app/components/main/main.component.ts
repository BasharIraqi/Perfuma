import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/customer';
import { Product } from 'src/app/interfaces/product';
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
  isAuth: boolean=true;
  customer:Customer={firstName:'bobo',lastName:'soso'}as Customer;
  constructor(private productService: ProductsService,
     private orderService: OrderService,
     private router: Router,
     private cartService: ProductsCartService,
     private auth:AuthService) 
  {

  }


  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value)=>
    {
     this.productsCart = value;
    });
    this.GetProducts();
    this.auth.selectAuth$.subscribe(value=>
      {
        this.isAuth=value;
      })
      this.auth.selectCustomer$.subscribe(value=>
        {
          this.customer=value;
        })
  }
  LogOut()
  {
    this.auth.setAuth(true,this.customer);
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
