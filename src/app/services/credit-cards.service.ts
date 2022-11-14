import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreditCardsService {

  httpUrl = BaseUrl() + "creditCards";

  constructor(private http: HttpClient,
    private authService: AuthService) {

  }

  getCards() {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.get(this.httpUrl, { headers: { "Authorization": jwt } });
  }
}
