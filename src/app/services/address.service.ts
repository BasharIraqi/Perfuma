import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  httpUrl = BaseUrl() + "addresses";

  constructor(private http: HttpClient,
    private authService: AuthService) {

  }

  getAddresses() {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.get(this.httpUrl, { headers: { "Authorization": jwt } });
  }

  deleteAddress(id:number){

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });
   return this.http.delete(this.httpUrl+'/'+id,{ headers: { "Authorization": jwt } });
  }
}
