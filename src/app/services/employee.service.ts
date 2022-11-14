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
    return this.http.get(this.httpUrl + '/' + id);
  }

  addEmployee(employee: Employee) {

    return this.http.post(this.httpUrl, employee);
  }

  getEmployeeByUserId(id: number) {
    return this.http.get(this.httpUrl + '/' + 'GetEmployeeByUserId' + '/' + id);
  }

  deleteEmployee(id: number) {

    let jwt: string = '';

    this.authService.selectJwt$.subscribe(data => {
      jwt = data;
    });
    
    return this.http.delete(this.httpUrl + '/' + id,{ headers: { "Authorization": jwt } });
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.httpUrl + '/' + employee.id, employee);
  }
}
