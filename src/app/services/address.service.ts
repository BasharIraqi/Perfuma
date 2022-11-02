import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  httpUrl=BaseUrl()+"addresses"

  constructor(private http:HttpClient) { 

  }

  getAddresses(){
    return this.http.get(this.httpUrl);
  }
}
