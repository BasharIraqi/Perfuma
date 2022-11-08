import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private httpUrl = BaseUrl() + "employees";

  constructor(private http: HttpClient) {

  }

  getEmployees() {
    return this.http.get(this.httpUrl);
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
    return this.http.delete(this.httpUrl + '/' + id);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.httpUrl + '/' + employee.id, employee);
  }
}
