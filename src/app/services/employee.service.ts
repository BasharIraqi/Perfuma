import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../interfaces/baseUrl';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private httpUrl=BaseUrl()+"employees";

  constructor(private http:HttpClient) { 

  }

   getEmployees(){
    this.http.get(this.httpUrl);
  }

   getEmployee(id:number){
    this.http.get(this.httpUrl+'/'+id);
  }

   deleteEmployee(id:number){
    this.http.delete(this.httpUrl+'/'+id);
  }

   updateEmployee(employee:Employee){
   this.http.put(this.httpUrl+'/'+employee.id,employee);
  }
}
