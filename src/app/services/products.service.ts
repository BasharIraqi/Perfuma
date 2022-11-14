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

  setProducts(products: any) {
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

  getProduct(id: number) {
    return this.http.get(this.httpUrl + '/' + id);
  }

  addProduct(product: any) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.post(this.httpUrl, product,{ headers: { "Authorization": jwt } });
  }

  updateProduct(product: any) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.put(this.httpUrl + '/' + product.id, product,{ headers: { "Authorization": jwt } });
  }

  deleteProduct(id: number) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.delete(this.httpUrl + '/' + id,{ headers: { "Authorization": jwt } });
  }



}
