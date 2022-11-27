import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';
import { Employee } from '../interfaces/employee';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private httpUrl = BaseUrl() + "employees";

  constructor(private http: HttpClient,
    private authService:AuthService) {

  }

  getEmployees() {
    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.get(this.httpUrl, { headers: { "Authorization": jwt } });
  }

  getEmployee(id: number) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.get(this.httpUrl + '/' + id,{ headers: { "Authorization": jwt } });
  }

  addEmployee(employee: Employee) {
    
    let jwt: string = '';
    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.post(this.httpUrl, employee,{ headers: { "Authorization": jwt } });
  }

  getEmployeeByUserId(id: number) {
    
    let jwt: string = '';
    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });

    return this.http.get(this.httpUrl + '/' + 'GetEmployeeByUserId' + '/' + id,{ headers: { "Authorization": jwt } });
  }

  deleteEmployee(id: number) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });
    
    return this.http.delete(this.httpUrl + '/' + id,{ headers: { "Authorization": jwt } });
  }

  updateEmployee(employee: Employee) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });
    
    return this.http.put(this.httpUrl + '/' + employee.id, employee,{ headers: { "Authorization": jwt } });
  }
}
