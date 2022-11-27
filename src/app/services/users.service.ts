import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpUrl = BaseUrl() + 'users';

  constructor(private http: HttpClient,
    private authService: AuthService) {

  }

  getUsers() {
    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.get(this.httpUrl, { headers: { "Authorization": jwt } });
  }

  getUser(user: User) {
    return this.http.get(this.httpUrl + '/' + user.email + '/' + user.password);
  }

  setUser(user: User) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.post(this.httpUrl, user, { headers: { "Authorization": jwt } });
  }

  checkUser(user: User) {
    return this.http.post(BaseUrl() + "login", user);
  }

  deleteUser(id: number) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.delete(this.httpUrl + '/' + id, { headers: { "Authorization": jwt } });
  }
}
