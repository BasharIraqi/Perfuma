import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {

  private httpUrl = BaseUrl() + "bankAccounts";
  
  constructor(private http:HttpClient) {

   }

   getAccounts(){
    return this.http.get(this.httpUrl);
   }
}
