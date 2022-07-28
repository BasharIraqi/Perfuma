import { Component, OnInit} from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsCartService } from 'src/app/services/products-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productsCart: Product[] = [];
  totalPrice: number = 0;


  constructor( private cartService: ProductsCartService) {

  }

  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;

    });
    this.calculatePrice();
  }
  calculatePrice() {
    this.productsCart.forEach(element => {
      this.totalPrice = this.totalPrice + element.price;
    }

    );
  }
  deleteProduct(product: Product) {
    this.productsCart.indexOf(product) > -1 ? this.productsCart.splice(this.productsCart.indexOf(product), 1) : null;
    this.cartService.setProductsCart(this.productsCart);
    this.totalPrice=this.totalPrice-product.price;
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