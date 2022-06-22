import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private products: Product[] = [];
  constructor(private httpService: ProductsService) {
  
  }

  ngOnInit(): void {
    this.GetProducts();
  }
  
  private GetProducts(): void {
    this.httpService.getProducts().subscribe((data:any) => {  
      this.products=data;
    });
  }



}
