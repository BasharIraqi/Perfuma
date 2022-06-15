import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products: any;
  constructor(private httpService: ProductsService) {
  
  }

  ngOnInit(): void {
    this.GetProducts();
  }
  
  GetProducts(): void {
    this.httpService.getProducts().subscribe(data => {  
      this.products = data;
    });
  }



}
