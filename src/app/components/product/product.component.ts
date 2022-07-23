import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product:Product= {} as Product;
  id: number=0;

  constructor(private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id=params['id'];
    }
    );
  }

  showProduct() {
    this.productService.getProduct(this.id).subscribe((data: any) => {
      this.product = data;
    }
    );
  }

}
