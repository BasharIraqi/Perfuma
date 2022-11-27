import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-employee-log-in',
  templateUrl: './employee-log-in.component.html',
  styleUrls: ['./employee-log-in.component.css']
})
export class EmployeeLogInComponent implements OnInit {
  hide: boolean = true;
  errorLogInMessage: string = '';
  user: User = {} as User;
  isAuth: boolean = true;

  constructor(private router: Router,
    private userService: UsersService,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.getUser();
    this.getAuth();
  }

  private getUser() {
    this.authService.selectUser$.subscribe(value => {
      this.user = value;
    }, (error: HttpErrorResponse) => {
      if(error)
      return;
    });
  }

  private getAuth() {
    this.authService.selectAuth$.subscribe(value => {
      this.isAuth = value;
    }, (error: HttpErrorResponse) => {
      if(error)
      return;
    });
  }

  onInputClick() {
    this.hide = true;
  }

  onLogInSubmit(details: NgForm) {

    if (details.valid) {

      this.userService.checkUser(details.value).subscribe((data: any) => {

        this.authService.setJwt("Bearer " + data.token);
        
        this.findUser(details);
        
      }, (error: HttpErrorResponse) => {
        if (error) {
          this.errorLogInMessage = "Unauthorized User";
          this.hide = false;
        }
      })

    }
    else {
      this.hide = false;
      this.errorLogInMessage = 'check your inputs'
    }
  }



  private findUser(details: NgForm) {
    this.userService.getUser(details.value).subscribe((data: any) => {
      this.user = data;
      if (this.user.role == 3) {
        this.errorLogInMessage = "Invalid User"
        this.hide = false;
        return;
      }
      this.router.navigate(['/employee/',this.user.id]);
      this.authService.setAuth(false, this.user);
     
    }, (error: HttpErrorResponse) => {
      if (error) {
        this.errorLogInMessage = "Wrong User or Password";
        this.hide = false;

      }
    });
  }

  

}

