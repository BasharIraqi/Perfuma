import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Address } from 'src/app/interfaces/address';
import { BankAccount } from 'src/app/interfaces/bankAccount';
import { Employee } from 'src/app/interfaces/employee';
import { User } from 'src/app/interfaces/user';
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
  response: any;
  addEmployee:boolean=true;
  showEmployees:boolean=false;
  errorMessage: string='';
  employee:Employee={}as Employee;
  address:Address={} as Address;
  bankAccount:BankAccount={} as BankAccount;
  user:User={}as User;
  hide:boolean=true;
  modalRef?: BsModalRef;
  modalRef2?:BsModalRef;

  constructor(private employeesService:EmployeeService,
    private modalService: BsModalService) {

   }

  ngOnInit(): void {

    this.getEmployees();
  }

  private getEmployees() {
    this.employeesService.getEmployees().subscribe((data: any) => {
      this.employees = data;
      this.filteredEmployees = data;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template);
  }


  onAddClick(){
    this.addEmployee=false;
    this.showEmployees=true;
  }

  onShowClick(){
    this.addEmployee=true;
    this.showEmployees=false;
  }

  uploadFinished = (event: any) => {
    this.response = event;
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

  onSubmit(newEmployee:NgForm){

    if(newEmployee.valid)
    {
      this.employee.id=Number(newEmployee.value.id);
      this.employee.jobType=Number(newEmployee.value.jobType);
      this.employee.age=new Date().getFullYear()-newEmployee.value.birthYear;
      this.employee.isActivated=true;
      
      this.bankAccount.name=Number(newEmployee.value.bankName);

      this.user.firstName=this.employee.firstName;
      this.user.lastName=this.employee.lastName;
      this.user.role=Number(newEmployee.value.roles);
      if(this.response!=null)
      {
        this.user.imagePath=this.response.dbPath;
      }

      this.employee.bankAccount=this.bankAccount;
      this.employee.address=this.address;
      this.employee.user=this.user;

      this.employeesService.addEmployee(this.employee).subscribe(data=>{
     
        this.hide=true;
        newEmployee.reset();
        this.getEmployees();
        setTimeout(()=>this.modalRef?.hide(),2000);

      },(error:HttpErrorResponse)=>{
        if(error){

         this.modalRef?.hide();
         this.hide=false;
         this.errorMessage='error on adding new employee try again';
        }
      })
    }

    else
    {
      this.modalRef?.hide();
      this.hide=false;
      this.errorMessage='check your inputs';
    }
    
  }

  deleteEmployee(employeeId:number){
   this.employeesService.deleteEmployee(employeeId).subscribe(data=>{
   
     this.hide=true;
     this.getEmployees();
      setTimeout(()=>this.modalRef2?.hide(),2000);

   },(error:HttpErrorResponse)=>{
    if(error)
    {
      this.hide=false;
      this.errorMessage="cant delete employee";
    }
   })
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
