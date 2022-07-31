import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductsCartService } from 'src/app/services/products-cart.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  productsCart: Product[]=[];
  user : any = {};
   currentYear: number = new Date().getFullYear();
  constructor(private cartService:ProductsCartService) { }

  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value)=>
    {
     this.productsCart = value;
    });
  }
  onSubmit(details:NgForm)
  {
    
  }

}
