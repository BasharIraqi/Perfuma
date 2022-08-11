import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpUrl = 'https://localhost:44312/api/products/';

  constructor(private http:HttpClient) {

   }
   getCategories(){
    return this.http.get(this.httpUrl+'categories');
    }
   getBrands(){
      return this.http.get(this.httpUrl+'brands');
    }
    getProducts(){
      return this.http.get(this.httpUrl);
    }
    getProduct(id:number){
      return this.http.get(this.httpUrl+id);
    }
    addProduct(product:any){
      return this.http.post(this.httpUrl,product);
    }
    updateProduct(product:any){
      return this.http.put(this.httpUrl+product.id,product);
    }
    deleteProduct(id:number){
      return this.http.delete(this.httpUrl+id);
    }



}
