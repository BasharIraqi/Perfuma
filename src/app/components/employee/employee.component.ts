import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  user: User = {} as User;
  isAuth: boolean = false;
  employee:Employee={}as Employee;
  showOrders: boolean = false;
  showCustomers: boolean = true;
  showCreditCards: boolean = true;
  showBankAccounts: boolean = true;
  showEmployees: boolean = true;
  showAddresses: boolean = true;
  showUsers: boolean = true;

  constructor(private authService: AuthService,
    private permissionsService:PermissionsService,
    private employeeService:EmployeeService) {

  }

  ngOnInit(): void {

    this.getPermissions();
    this.getUser();
    this.getAuth();
  }

  getAuth() {
   this.authService.selectAuth$.subscribe(value=>{
    this.isAuth=value;
   })
  }

  getUser() {
    this.authService.selectUser$.subscribe(value=>{
      this.user=value;
    })
  }

  getPermissions() {
   this.permissionsService.selectedShowBankAccounts$.subscribe(value=>{
    this.showBankAccounts=value;
   });

   this.permissionsService.selectedShowCustomers$.subscribe(value=>{
    this.showCustomers=value;
   });

   this.permissionsService.selectedShowEmployees$.subscribe(value=>{
    this.showEmployees=value;
   });

   this.permissionsService.selectedShowOrders$.subscribe(value=>{
    this.showOrders=value;
   });

   this.permissionsService.selectedShowUsers$.subscribe(value=>{
    this.showUsers=value;
   });

   this.permissionsService.selectedshowAddresses$.subscribe(value=>{
    this.showAddresses=value;
   });

   this.permissionsService.selectedshowCreditCards$.subscribe(value=>{
    this.showCreditCards=value;
   });
  }

  onSubmit(details:NgForm){

  }


  
}


