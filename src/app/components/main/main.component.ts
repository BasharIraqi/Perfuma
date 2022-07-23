import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { OrderService } from 'src/app/services/order.service';
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
  constructor(private productService: ProductsService, private orderService: OrderService,private router: Router)
   {

  }


  ngOnInit(): void {
    this.GetProducts();
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
