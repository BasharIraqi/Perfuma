import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsCartService } from 'src/app/services/products-cart.service';

@Component({
  selector: 'app-paymnet',
  templateUrl: './paymnet.component.html',
  styleUrls: ['./paymnet.component.css']
})
export class PaymnetComponent implements OnInit {
  productsCart: Product[]=[];
  totalPrice: number=0;

  constructor(private cartService:ProductsCartService) { }

  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value)=>
    {
     this.productsCart = value;
    }
    );
    this.calculatePrice();
  }
  calculatePrice() {
    this.productsCart.forEach(element => {
      this.totalPrice = this.totalPrice + element.price;
    }
    );
  }

}
