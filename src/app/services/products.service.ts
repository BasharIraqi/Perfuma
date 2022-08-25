import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpUrl = 'https://localhost:44312/api/products/';

  private products$ = new BehaviorSubject<Product[]>([]);
  selectedProducts$ = this.products$.asObservable();


  constructor(private http: HttpClient) {

  }

  setProducts(products: any) {
    this.products$.next(products);
  }

  getCategories() {
    return this.http.get(this.httpUrl + 'categories');
  }
  getBrands() {
    return this.http.get(this.httpUrl + 'brands');
  }
  getProducts() {
    return this.http.get(this.httpUrl);
  }
  getProduct(id: number) {
    return this.http.get(this.httpUrl + id);
  }
  addProduct(product: any) {
    return this.http.post(this.httpUrl, product);
  }
  updateProduct(product: any) {
    return this.http.put(this.httpUrl + product.id, product);
  }
  deleteProduct(id: number) {
    return this.http.delete(this.httpUrl + id);
  }



}
