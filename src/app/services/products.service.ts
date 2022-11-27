import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';
import { BaseUrl } from '../interfaces/baseUrl';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpUrl = BaseUrl() + "products";

  private products$ = new BehaviorSubject<Product[]>([]);
  selectedProducts$ = this.products$.asObservable();


  constructor(private http: HttpClient,
    private authService:AuthService) {

  }

  setProducts(products: Product[]) {
    this.products$.next(products);
  }

  getCategories() {
    return this.http.get(this.httpUrl + '/' + 'categories');
  }

  getBrands() {
    return this.http.get(this.httpUrl + '/' + 'brands');
  }

  getProducts() {
    return this.http.get(this.httpUrl);
  }

  getProduct(barcode: number) {
    return this.http.get(this.httpUrl + '/' + barcode);
  }

  addProduct(product: Product) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.post(this.httpUrl, product,{ headers: { "Authorization": jwt } });
  }

  updateProduct(product: Product) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.put(this.httpUrl + '/' + product.barcode, product,{ headers: { "Authorization": jwt } });
  }

  deleteProduct(barcode: number) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.delete(this.httpUrl + '/' + barcode,{ headers: { "Authorization": jwt } });
  }



}
