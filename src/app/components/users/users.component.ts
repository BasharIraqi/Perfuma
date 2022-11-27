import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  anonymousImage: string = 'Resources/Images/anonymous.png';
  search:string='';
  

  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {

    this.getUsers();
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44312/${serverPath}`;
  }

  private getUsers() {
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data;
      this.filteredUsers = data;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });
  }

   getImage(path: string) {

    if (path == null) {
      return this.createImgPath(this.anonymousImage);
    }

    return this.createImgPath(path);
  }

  onUserSearch(e:string){
    
   let searchInput:string=e;

   this.filteredUsers=this.users.filter(user=>{
    return user.firstName.toLowerCase().includes(searchInput.toLowerCase())
    ||  user.lastName.toLowerCase().includes(searchInput.toLowerCase())
   })
  }

  getUserRole(role: number) {

    switch (role) {
      case 0:
        return "Admin";

      case 1:
        return "Manager";

      case 2:
        return "General";

      case 3:
        return "Customer";

      default:
        return "";
    }
  }

}
