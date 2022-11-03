import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CreditCardsService {

  httpUrl=BaseUrl()+"creditCards";

  constructor(private http:HttpClient) {

   }

   getCards(){
    return this.http.get(this.httpUrl);
   }
}
