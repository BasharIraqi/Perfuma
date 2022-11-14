import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  products: Product[] = [];
  filteredProducts:Product[]=[];
  searchInput: string = '';

  constructor(private productsService: ProductsService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getProducts();
  }
  
  private getProducts() {
    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });
  }

  onSelect(e:any){
  let getBarcode=e.item.barcode;
  this.router.navigate(['product/',getBarcode]);
  }
  
  
}
 

