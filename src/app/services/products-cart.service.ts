import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsCartService {
  private productsCart$ = new BehaviorSubject([]);
  selectedProduct$ = this.productsCart$.asObservable();
  constructor() { }

  setProductsCart(Cart: any) {
    this.productsCart$.next(Cart);
  }
}
