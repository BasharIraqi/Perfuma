import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[]=[];
  filteredProducts:Product[]=[];
  search:string='';

  constructor(private productsService:ProductsService) {

  }

  ngOnInit(): void {
  
    this.productsService.getProducts().subscribe((data:any)=>{
      this.products=data;
      this.filteredProducts=data;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });

  }
    
  onProductSearch(e:string){
  
    let searchInput:string=e;

    this.filteredProducts=this.products.filter(product=>{
      return product.name.toLowerCase().includes(searchInput.toLowerCase())
      || product.description.toLowerCase().includes(searchInput.toLowerCase())
    });
    
  }


  categoryType(category: number) {

    switch (category) {
      case 0:
        return "Men Perfume";

      case 1:
        return "Women Perfume";

      case 2:
        return "Unisex Perfume";

      case 3:
        return "Men Boutiqe Perfume";

      case 4:
        return "Women Boutiqe Perfume";

      case 5:
        return "Unisex Boutiqe Perfume";

      case 6:
        return "Men Set";

      case 7:
        return "Women Set";

      default:
        return "";
    }

  }

}
