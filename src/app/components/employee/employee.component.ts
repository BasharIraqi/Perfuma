import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  searchInput: string = '';
  options: Product[] = [];

  constructor(private productsService: ProductsService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data: any) => {
      this.options = data;
    });
  }


  
}

