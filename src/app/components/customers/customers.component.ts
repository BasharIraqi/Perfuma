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
  
  constructor(private customerService:CustomerService) {
    
   }

  ngOnInit(): void {

    this.customerService.getCustomers().subscribe((data:any)=>{
      this.customers=data;
      this.filteredCustomers=data;
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


  onCustomerSearch(e:any){
   let searchInput:string=e.target.data;

  this.filteredCustomers=this.customers.filter(customer=>{
    return customer.firstName.toLowerCase().includes(searchInput.toLowerCase())
    || customer.lastName.toLowerCase().includes(searchInput.toLowerCase())
  });
  }

}
