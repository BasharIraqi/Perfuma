import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  products: Product[] = [];
  productsCart: Product[] = [];
  productsNumber: number = 0;
  isAuth: boolean = true;
  searchInput: string = '';
  hideAlert: boolean = true;
  user: User = {} as User;
  brands: string[] = [];
  filterProducts: Product[] = [];
  categories: number[] = [];
  notFoundMessage:string='';
  filterderOptions: Observable<Product[]>=new Observable<Product[]>;
  myControl=new FormControl();

  constructor(private productService: ProductsService,
    private router: Router,
    private cartService: ProductsCartService,
    private auth: AuthService,
    public dialog:MatDialog) {

  }


  ngOnInit(): void {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    });
    this.GetProducts();
  
    this.auth.selectAuth$.subscribe(value => {
      this.isAuth = value;
    });
    this.auth.selectUser$.subscribe(value => {
      this.user = value;
    });
    this.productService.getBrands().subscribe((data: any) => {
      this.brands = data;
    });
    this.productService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
    this.filterderOptions=this.myControl.valueChanges.pipe(
      startWith(''),
      map(term=>{
        return this.products.filter(product=>product.name.toLowerCase().includes(term.toLowerCase())
         || product.description.toLowerCase().includes(term.toLowerCase()))
      })
    )
  }
  onClickOption(barcode: number) {
    this.router.navigate(['/product/barcode'])
  }
  
  openDialog() { 
    let getSearch=this.myControl.value;
    if(getSearch!=null)
    {

      let find=this.products.filter(product=>{
        return product.name.toLowerCase().includes(getSearch.toLowerCase()
           || product.description.toLowerCase().includes(getSearch.toLowerCase()))
      })
      if(find.length==0){
       this.dialog.open(DialogComponent);
      }
    }
  }

  onPriceSubmit(price:NgForm){
    this.notFoundMessage='';
    this.filterProducts=this.products.filter(value=>{
      return value.price>=price.value.minPrice&&value.price<=price.value.maxPrice;
    })
    if(this.filterProducts.length==0)
    this.notFoundMessage='No results found';
  
  }
  onCategoryFilter(category:number){
   this.filterProducts=this.products.filter(value=>{
    return value.category==category;
   })
  }
  onClickShowAll(){
    this.notFoundMessage='';
    this.filterProducts=this.products;
  }
  onBrandFilter(brand: string): void {
   this.filterProducts=this.products;

   let filters=this.products.filter(value=>{
    return value.name==brand;
   })
    this.filterProducts=filters;
  }
  onInputClick(): void {
    if (this.searchInput == "No results found") {
      this.searchInput = '';
      this.GetProducts();
    }
  }
  onChange(event: any) {
    this.searchInput = event;
    if (this.searchInput == '')
      this.filterProducts=this.products;
    else {
      let searchResult = this.products.filter((value) => {
        return value.name.toLowerCase().includes(this.searchInput.toLowerCase()) || value.description.toLowerCase().includes(this.searchInput.toLowerCase());
      })

      if (searchResult.length == 0)
        this.filterProducts=this.products;

      else
        this.filterProducts = searchResult;
    }
  }
  onSearch(value: NgForm) {
    let res = value.value.input;
    let searchResult = this.products.filter((value) => {
      return value.name.toLowerCase().includes(res.toLowerCase()) || value.description.toLowerCase().includes(this.searchInput.toLowerCase());
    }
    )
    if (searchResult.length == 0) {
      this.searchInput = "No results found";
    }
    else
      this.filterProducts = searchResult;
  }
  LogOut() {
    this.auth.setAuth(true, this.user);
    this.router.navigate(['/']);
  }
  private GetProducts(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filterProducts = data;
    });
  }

  AddProduct(product: Product): void {
    this.productsCart.push(product);
    this.productsNumber = this.productsNumber + 1;
  }

  categoryType(category: number) {
    {
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
}
