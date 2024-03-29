import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  id: number = 0;
  user: User = {} as User;
  isAuth: boolean = false;
  employee: Employee = {} as Employee;
  showOrders: boolean = true;
  showCustomers: boolean = true;
  showCreditCards: boolean = true;
  showBankAccounts: boolean = true;
  showEmployees: boolean = true;
  showAddresses: boolean = true;
  showUsers: boolean = true;
  showProducts: boolean = true;
  show: boolean = true;

  constructor(private authService: AuthService,
    private permissionsService: PermissionsService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {

    this.getPermissions();
    this.getUser();
    this.getAuth();
    this.getEmployee();
  }

  getEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeByUserId(this.id).subscribe((data: any) => {
      this.employee = data;
    }, (error: HttpErrorResponse) => {
      if (error) {
        return;
      }
    })
  }

  getAuth() {
    this.authService.selectAuth$.subscribe(value => {
      this.isAuth = value;
    }, (error: HttpErrorResponse) => {
      return;
    });

    if (this.isAuth) {
      this.router.navigate(['/employeeLogIn']);
    }

  }

  getUser() {
    this.authService.selectUser$.subscribe(value => {
      this.user = value;
    }, (error: HttpErrorResponse) => {
      return;
    });
  }

  getPermissions() {
    this.permissionsService.selectedShowBankAccounts$.subscribe(value => {
      this.showBankAccounts = value;
      if (this.showBankAccounts == false)
        this.show = false;
    }, (error: HttpErrorResponse) => {
      return;
    });

    this.permissionsService.selectedShowCustomers$.subscribe(value => {
      this.showCustomers = value;
      if (this.showCustomers == false)
        this.show = false;
    }, (error: HttpErrorResponse) => {
      return;
    });

    this.permissionsService.selectedShowEmployees$.subscribe(value => {
      this.showEmployees = value;
      if (this.showEmployees == false)
        this.show = false;
    }, (error: HttpErrorResponse) => {
      return;
    });

    this.permissionsService.selectedShowOrders$.subscribe(value => {
      this.showOrders = value;
      if (this.showOrders == false)
        this.show = false;
    }, (error: HttpErrorResponse) => {
      return;
    });

    this.permissionsService.selectedShowUsers$.subscribe(value => {
      this.showUsers = value;
      if (this.showUsers == false)
        this.show = false;
    }, (error: HttpErrorResponse) => {
      return;
    });

    this.permissionsService.selectedshowAddresses$.subscribe(value => {
      this.showAddresses = value;
      if (this.showAddresses == false)
        this.show = false;
    }, (error: HttpErrorResponse) => {
      return;
    });

    this.permissionsService.selectedshowCreditCards$.subscribe(value => {
      this.showCreditCards = value;
      if (this.showCreditCards == false)
        this.show = false;
    }, (error: HttpErrorResponse) => {
      return;
    });

    this.permissionsService.selectedshowProducts$.subscribe(value => {
      this.showProducts = value;
      if (this.showProducts == false)
        this.show = false;
    }, (error: HttpErrorResponse) => {
      return;
    });

  }



}


