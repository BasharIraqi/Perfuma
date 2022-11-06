import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees:Employee[]=[];
  filteredEmployees:Employee[]=[];
  anonymousImage: string = 'Resources/Images/anonymous.png';
  search:string='';

  constructor(private employeesService:EmployeeService) {

   }

  ngOnInit(): void {

    this.employeesService.getEmployees().subscribe((data:any)=>{
      this.employees=data;
      this.filteredEmployees=data;
    },error=>{
      if(error)
      return;
    })
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44312/${serverPath}`;
  }

   getImage(path: string) {

    if (path == null) {
      return this.createImgPath(this.anonymousImage);
    }

    return this.createImgPath(path);
  }

  onEmployeeSearch(e:string){

   let searchInput:string=e;
   
   this.filteredEmployees=this.employees.filter(employee=>{
    return employee.id.toString().includes(searchInput)
   });

  }

  getEmployeeType(type: number) {

    switch (type) {

      case 0:
        return "Director";

      case 1:
        return "Manager";

      case 2:
        return "General";

      default:
        return "";
    }
  }

}
