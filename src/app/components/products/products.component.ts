import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  search: string = '';
  modalRef?: BsModalRef;
  modalRef2?: BsModalRef;
  message: string = '';
  errorMessage: string = '';
  product: Product = {} as Product;
  hide: boolean = true;
  addProduct: boolean = true;
  showProducts: boolean = false;
  updatedProduct: Product = {} as Product;

  constructor(private productsService: ProductsService,
    private modalService: BsModalService) {

  }

  ngOnInit(): void {

    this.getProducts();

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template);
  }

  onAddClick() {
    this.addProduct = false;
    this.showProducts = true;
  }

  onShowClick() {
    this.addProduct = true;
    this.showProducts = false;
  }

  private getProducts() {
    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = data;
    }, (error: HttpErrorResponse) => {
      if (error)
        return;
    });
  }

  onSubmit(newProduct: NgForm) {

    if (newProduct.valid) {
      this.product.category = Number(newProduct.value.category);
      this.product.isInStock = Boolean(newProduct.value.isInStock);

      this.productsService.addProduct(this.product).subscribe(data => {

        this.hide = true;
        this.message = 'Product Added Suuccfully';
        this.getProducts();
        setTimeout(() => this.modalRef?.hide(), 2000);
      }, (error: HttpErrorResponse) => {
        if (error) {
          this.errorMessage = 'Error On Adding Product Try Again';
          this.hide = false;
        }
      })
    }

    else {
      this.errorMessage = "check your inputs";
      this.hide = false;
    }
  }

  onUpdateClick(product: Product) {
    this.updatedProduct = product;
  }

  onUpdate(product: NgForm) {
    
    if(product.valid)
    {
      this.productsService.updateProduct(this.updatedProduct).subscribe(data=>{
       
        this.modalRef2?.hide();
        this.message='The Product Updated Successfully';
        setTimeout(()=>this.modalRef?.hide(),2000);
      },(error:HttpErrorResponse)=>{
        if(error){
          this.modalRef2?.hide();
          this.message='Error in updating product try again';
          setTimeout(()=>this.modalRef?.hide(),2000);
        }
      })
    }

    else{
      this.message='Check your inputs';
      setTimeout(()=>this.modalRef?.hide(),2000);
    }


  }

  deleteProduct(product: Product) {

    this.productsService.deleteProduct(product.barcode).subscribe(data => {
      this.message = 'Product Deleted Successfully';
      setTimeout(() => this.modalRef?.hide(), 2000);
      this.getProducts();
    }, (error: HttpErrorResponse) => {
      if (error) {
        this.message = 'Error On Removing Product Try Again';
        setTimeout(() => this.modalRef?.hide(), 2000);
      }
    })
  }

  onProductSearch(e: string) {

    let searchInput: string = e;

    this.filteredProducts = this.products.filter(product => {
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
