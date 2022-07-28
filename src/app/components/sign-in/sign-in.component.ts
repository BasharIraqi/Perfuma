import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductsCartService } from 'src/app/services/products-cart.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  productsCart: Product[] = [];
  constructor(private cartService: ProductsCartService) { }

  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    }
    );
  }
  onSubmit(details:NgForm) {
    console.log(details.value);
  }

}
