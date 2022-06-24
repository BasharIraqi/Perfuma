import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products: Product[] = [];
  private productsCart: Product[] = [];
  productsNumber:number=1;
  constructor(private productService: ProductsService, private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.GetProducts();
  }

  private GetProducts(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  private AddProduct(product: Product): void {
    this.productsCart.push(product);
    this.productsNumber++;
  }



}
