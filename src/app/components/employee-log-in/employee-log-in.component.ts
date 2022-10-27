import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Address } from 'src/app/interfaces/address';
import { BankAccount } from 'src/app/interfaces/bankAccount';
import { Employee } from 'src/app/interfaces/employee';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-employee-log-in',
  templateUrl: './employee-log-in.component.html',
  styleUrls: ['./employee-log-in.component.css']
})
export class EmployeeLogInComponent implements OnInit {
  hide: boolean = true;
  isNewEmployee: boolean = true;
  errorLogInMessage: string = '';
  user: User = {} as User;
  isAuth: boolean = true;
  employee: Employee = {} as Employee;
  bankAccount: BankAccount = {} as BankAccount;
  address: Address = {} as Address;
  response: any;
  errorAddEmployeeMessage: string = '';
  modalRef?: BsModalRef;
  isHide:boolean=true;

  constructor(private router: Router,
    private userService: UsersService,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private modalService: BsModalService) { }

  ngOnInit(): void {

    this.getUser();
    this.getAuth();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  uploadFinished = (event: any) => {
    this.response = event;
  }

  private getUser() {
    this.authService.selectUser$.subscribe(value => {
      this.user = value;
    });
  }

  private getAuth() {
    this.authService.selectAuth$.subscribe(value => {
      this.isAuth = value;
    });
  }

  onInputClick() {
    this.hide = true;
  }

  onLogInSubmit(details: NgForm) {

    if (details.valid) {

      this.userService.getUser(details.value).subscribe((data: any) => {
        this.user = data;
        this.authService.setAuth(false, this.user);
        this.getIfNewEmployee();
      }, error => {
        if (error.status == 401) {
          this.errorLogInMessage = "Wrong User or Password";
          this.hide = false;
        }
        else {
          this.errorLogInMessage = "User Not Exist";
          this.hide = false;
        }
      }
      )
    }
    else {
      this.hide = false;
      this.errorLogInMessage = 'check your inputs'
    }
  }

  getIfNewEmployee() {
    this.employeeService.getEmployeeByUserId(this.user.id).subscribe((data: any) => {
      
      if(!data){
        this.isNewEmployee=false;
        this.isHide=false;
      }
      else{
        this.employee = data;
        this.router.navigate(['/employee/', this.employee.id])
      }
    })
  }

  onAddEmployeeSubmit(details: NgForm) {

    if (details.valid) {

      this.user.imagePath = this.response.dbPath;
      this.employee.address = this.address;
      this.employee.age = new Date().getFullYear() - Number(this.employee.birthYear);
      
      this.employee.isActivated = true;
      this.bankAccount.bankName=Number(details.value.bankName);

      if (this.employee.jobType == 0)
        this.employee.salaryPerHour = 120;
      else if (this.employee.jobType == 1)
        this.employee.salaryPerHour = 60;
      else
        this.employee.salaryPerHour = 35;

      this.employee.bankAccount = this.bankAccount;
      this.employee.seniority = new Date().getFullYear() - Number(this.employee.startedYear);

      this.employeeService.addEmployee(this.employee).subscribe((data: any) => {
        this.errorAddEmployeeMessage = "Added Details Successfully 😊";
        this.employee.id=data;
        this.employee.user=this.user;

        this.employeeService.updateEmployee(this.employee).subscribe((data)=>{
        })
      }, error => {
        if (error) {
          this.errorAddEmployeeMessage = "check your details";
        }
      })
    }
    else {
      this.errorAddEmployeeMessage = "check your details";
    }
  }



}

