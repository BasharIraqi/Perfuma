import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  closeResult = '';

  brands: string[] = [];
  products: Product[] = [];
  filterProducts: Product[] = []
  categories: number[] = [];

  constructor(private offcanvasService: NgbOffcanvas,
    private productsService: ProductsService) {

  }

  ngOnInit(): void {
    this.productsService.getBrands().subscribe((data: any) => {
      this.brands = data;
    });
    this.productsService.getCategories().subscribe((data: any) => {
      this.categories = data
    })
  }
  open(content: any) {
    this.offcanvasService.open(content,{ ariaLabelledBy: 'offcanvas-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onBrandClick(brand: string) {
    let filter = this.products.filter(product => {
      return product.name == brand;
    })
   
   this.offcanvasService.dismiss("filter brand");
  }

  onCategoryClick(category: number) {
    let filter = this.products.filter(product => {
      return product.category == category;
    })
    this.filterProducts = filter;
   this.offcanvasService.dismiss("filter category");
  }
  
  onClickNoFilters(){
    this.filterProducts=this.products;
    this.offcanvasService.dismiss("no filter");
  }
  categoryType(category: number) {

    switch (category) {
      case 0:
        return "Men Perfume";
        break;
      case 1:
        return "Women Perfume";
        break;
      case 2:
        return "Unisex Perfume";
        break;
      case 3:
        return "Men Boutiqe Perfume";
        break;
      case 4:
        return "Women Boutiqe Perfume";
        break;
      case 5:
        return "Unisex Boutiqe Perfume";
        break;
      case 6:
        return "Men Set";
        break;
      case 7:
        return "Women Set";
        break;

      default:
        return "";
    }



  }
}
