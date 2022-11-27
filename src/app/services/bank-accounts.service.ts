import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {

  private httpUrl = BaseUrl() + "bankAccounts";

  constructor(private http: HttpClient,
    private authService: AuthService) {

  }

  getAccounts() {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.get(this.httpUrl, { headers: { "Authorization": jwt } });
  }

  deleteAccount(accountNumber:number) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.delete(this.httpUrl+'/'+accountNumber, { headers: { "Authorization": jwt } });
  }
}
