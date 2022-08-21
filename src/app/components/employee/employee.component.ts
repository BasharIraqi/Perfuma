import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  searchInput: string = '';
  options: Product[] = [];
  filterderOptions: Observable<Product[]>=new Observable<Product[]>;
  myControl=new FormControl();

  constructor(private productsService: ProductsService,
    private router: Router,
    public dialog:MatDialog) {

  }
  openDialog() { 
    let getSearch=this.myControl.value;
    if(getSearch!=null)
    {

      let find=this.options.filter(option=>{
        return option.name.toLowerCase().includes(getSearch.toLowerCase()
           || option.description.toLowerCase().includes(getSearch.toLowerCase()))
      })
      if(find.length==0){
       this.dialog.open(DialogComponent);
      }
    }
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data: any) => {
      this.options = data;
    })
     
    this.filterderOptions=this.myControl.valueChanges.pipe(
      startWith(''),
      map(term=>{
        return this.options.filter(option=>option.name.toLowerCase().includes(term.toLowerCase())
         || option.description.toLowerCase().includes(term.toLowerCase()))
      })
    )
  }

  onClickOption(barcode: number) {
    this.router.navigate(['/product/barcode'])
  }

  
}


