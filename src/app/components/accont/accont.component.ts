import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreditCard } from 'src/app/interfaces/creditCard';
import { Customer } from 'src/app/interfaces/customer';
import { Address } from 'src/app/interfaces/address';
import { Order } from 'src/app/interfaces/order';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsCartService } from 'src/app/services/products-cart.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-accont',
  templateUrl: './accont.component.html',
  styleUrls: ['./accont.component.css']
})
export class AccontComponent implements OnInit {

  productsCart: Product[] = [];
  user: User = {} as User;
  orders: Order[] = [];
  address: Address = {} as Address;
  creditCard: CreditCard = {} as CreditCard;
  customer: Customer = {} as Customer;
  isAuth: boolean = false;
  userId: number = 0;
  show: boolean = true;
  modalRefOrder?: BsModalRef;
  modalRefProduct?: BsModalRef;
  modalRefDetails?: BsModalRef;
  orderMessage: string = '';
  productDeleteMessage: string = '';
  userPicture: string = '';
  anonymousImage: string = 'Resources/Images/anonymous.png';
  response: any;
  id: number = 0;
  order: Order = {} as Order;
  product: Product = {} as Product;
  productMsgHideButtons: boolean = false;
  orderMsgHideButtons: boolean = false;
  modifiedCustomer: Customer = {} as Customer;
  detailsUpdateMsg: string = '';

  constructor(private cartService: ProductsCartService,
    private authService: AuthService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private modalService: BsModalService,
    private router:Router) {

  }

  ngOnInit(): void {

    this.getCart();

    this.getUserAuth();

    this.getUser();

    if (!this.isAuth) {
      this.getUserOrders();
      this.getCustomer();
      this.getImage();
    }

  }

  uploadFinished = (event: any) => {
    this.response = event;
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44312/${serverPath}`;
  }

  private getImage() {

    if (this.user.imagePath == null) {
      this.userPicture = this.createImgPath(this.anonymousImage);
    }
    else if (this.user.imagePath != null) {
      this.userPicture = this.createImgPath(this.user.imagePath);
    }
  }

  calculatePrice(products: Product[]): number {
    let totalPrice: number = 0;
    products.forEach(product => {
      totalPrice = totalPrice + product.price;
    });
    return totalPrice;
  }

  openModalOrder(template: TemplateRef<any>) {
    this.modalRefOrder = this.modalService.show(template);
  }

  openModalProduct(template: TemplateRef<any>) {
    this.modalRefProduct = this.modalService.show(template);
  }

  openModalDetails(template: TemplateRef<any>) {
    this.modalRefDetails = this.modalService.show(template);
  }

  

  onSubmit(details: NgForm) {
    if (details.valid) {
      if (this.response != null) {
        this.customer.user.imagePath = this.response.dbPath;
      }
      this.modifiedCustomer.id = this.customer.id;
      this.modifiedCustomer.firstName = details.value.firstName;
      this.modifiedCustomer.lastName = details.value.lastName;
      this.modifiedCustomer.email = details.value.email;
      this.modifiedCustomer.phoneNumber = details.value.phoneNumber;
      this.modifiedCustomer.user = this.user;
      this.modifiedCustomer.user.firstName = details.value.firstName;
      this.modifiedCustomer.user.lastName = details.value.lastName;
      this.modifiedCustomer.user.email=details.value.email;
      this.modifiedCustomer.address = this.address;
      this.modifiedCustomer.creditCard = this.creditCard;

      this.customerService.updateCustomer(this.modifiedCustomer).subscribe((data: any) => {
        this.detailsUpdateMsg = 'Your Details Updated Successfully';
        setTimeout(() => this.modalRefDetails?.hide(), 2000)
      }, (error:HttpErrorResponse) => {
        if (error) {
          this.detailsUpdateMsg = 'Error In Updating Your Details Check Your Inputs';
          setTimeout(() => this.modalRefDetails?.hide(), 2000)
        }
      })
    }
    else {
      this.detailsUpdateMsg = 'Check Your Inputs';
      setTimeout(() => this.modalRefDetails?.hide(), 2000)
    }
  }

  private getCustomer() {
    this.userId = this.route.snapshot.params['id'];
    this.customerService.GetCustomerByUserId(this.userId).subscribe((data: any) => {
      this.customer = data;
      this.address = data.address;
      this.creditCard = data.creditCard;
    }, (error:HttpErrorResponse) => {
      if (error) {
        return;
      }
    });
  }

  onProductDelete(order: Order, product: Product) {
    if (order.products.length == 1) {
      this.productMsgHideButtons = true;
      this.productDeleteMessage = "Can not make empty order cancel your order please";
    }
    else {
      this.productMsgHideButtons = false;
      this.product = product;
      this.order = order;
      this.productDeleteMessage = `Are you sure to delete ${product.name + " " + product.description} ???`;
    }
  }

  private getCart() {
    this.cartService.selectedProduct$.subscribe((value) => {
      this.productsCart = value;
    },(error:HttpErrorResponse)=>{
      if(error)
      return;
    });
  }

  private getUserAuth() {
    this.authService.selectAuth$.subscribe(data => {
      this.isAuth = data;
    },(error:HttpErrorResponse)=>{
      if(error)
      return;
    });

    if(this.isAuth){
      this.router.navigate(['/logIn']);
     }
  }

  private getUser() {
    this.authService.selectUser$.subscribe(data => {
      this.user = data;
    },(error:HttpErrorResponse)=>{
      if(error)
      return;
    });
  }

  getUserOrders() {
    this.userId = this.route.snapshot.params['id'];
    this.orderService.getOrdersByUser(this.userId).subscribe((data: any) => {
      this.orders = data;
      if (this.orders.length == 0) {
        this.show = false;
      }
      else {
        this.show = true;
      }
    },(error:HttpErrorResponse)=>{
      return;
    });
  }

  onProductYesClick() {
    this.productMsgHideButtons = true;
    let filterProducts = this.order.products.filter(p => {
      return p.barcode != this.product.barcode
    });

    this.order.products = filterProducts;
    this.order.paymentValue = this.calculatePrice(this.order.products);
    this.order.numberOfProducts = this.order.products.length;

    this.orderService.updateOrder(this.order).subscribe((data) => {
      this.productDeleteMessage = `order number ${this.order.id} updated successfully`;
      setTimeout(() => this.modalRefProduct?.hide(), 2000)
    }, (error:HttpErrorResponse) => {
      if (error) {
        this.productDeleteMessage = "sorry we cant cancel this product";
        setTimeout(() => this.modalRefProduct?.hide(), 2000)
      
      }
    })
  }

  onProductNoClick() {
    this.modalRefProduct?.hide();
  }

  onOrderYesClick() {
    this.orderMsgHideButtons = true;
    this.orderService.deleteOrder(this.id).subscribe(data => {
      this.orderMessage = `Your Order number ${this.id} Canceled Successfully !!!`
      setTimeout(() => this.modalRefOrder?.hide(), 2000)
      this.getUserOrders();
    }, (error:HttpErrorResponse) => {
      if (error) {
        this.orderMessage = "Sorry we cant cancel your order";
        setTimeout(() => this.modalRefOrder?.hide(), 2000)
      }
    })
  }

  onOrderNoClick() {
    this.modalRefOrder?.hide();
  }

  onOrderDelete(orderId: number) {
    this.orderMsgHideButtons = false;
    this.id = orderId;
    this.orderMessage = `Your Order number ${orderId} will be Canceled Are You Sure ???`
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
