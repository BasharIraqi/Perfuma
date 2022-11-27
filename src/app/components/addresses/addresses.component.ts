import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/interfaces/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  addresses:Address[]=[];
  filterAddrsses:Address[]=[];
  search:string='';

  constructor(private addressService:AddressService) {

   }

  ngOnInit(): void {

    this.getAddresses();

  }

  private getAddresses() {
    this.addressService.getAddresses().subscribe((data: any) => {
      this.addresses = data;
      this.filterAddrsses = data;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });
  }

  onAddressSearch(e:string){

  let searchInput:string=e;

    this.filterAddrsses=this.addresses.filter(address=>{
    return address.city.toLowerCase().includes(searchInput.toLowerCase()) 
    || address.country.toLowerCase().includes(searchInput.toLowerCase())
    || address.street.toLowerCase().includes(searchInput.toLowerCase())
  })

  }



}
