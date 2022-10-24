import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  hide: boolean=true;
  errorMessage:string='';
  user: User={}as User;
  isAuth: boolean=true;

  constructor(private router:Router,
    private employeeService:EmployeeService,
    private userService:UsersService,
    private authService:AuthService) { }

  ngOnInit(): void {

    this.getUser();
    this.getAuth();
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

  onSubmit(details:NgForm){
    
    if(details.valid){

      this.userService.getUser(details.value).subscribe((data: any) => {
        this.user = data;
        this.authService.setAuth(false, this.user);
        this.router.navigate(['/employee/',this.user.id])
      }, error => {
        if (error.status == 401) {
          this.errorMessage = "Wrong User or Password";
          this.hide = false;
        }
        if (error.status == 500) {
          this.errorMessage = "User Not Exist";
          this.hide = false;
        }
      }
    )
    }
    else{
      this.hide=false;
      this.errorMessage='check your inputs'
    }

  }

}
