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
  productsCart: Product[] = [];
  productsNumber:number=0;
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

    AddProduct(product:Product): void {
      this.productsCart.push(product);
      this.productsNumber=this.productsNumber+1;
  }



}
