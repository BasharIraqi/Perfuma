import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers:Customer[]=[];
  filteredCustomers:Customer[]=[];
  anonymousImage: string = 'Resources/Images/anonymous.png';
  search:string='';
  
  constructor(private customerService:CustomerService) {
    
   }

  ngOnInit(): void {

    this.getCustomers();
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44312/${serverPath}`;
  }

  private getCustomers() {
    this.customerService.getCustomers().subscribe((data: any) => {
      this.customers = data;
      this.filteredCustomers = data;
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


  onCustomerSearch(e:string){

   let searchInput:string=e;

  this.filteredCustomers=this.customers.filter(customer=>{
    return customer.firstName.toLowerCase().includes(searchInput.toLowerCase())
    || customer.lastName.toLowerCase().includes(searchInput.toLowerCase())
  });
  }

}
