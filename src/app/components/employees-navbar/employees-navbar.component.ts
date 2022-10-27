import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-employees-navbar',
  templateUrl: './employees-navbar.component.html',
  styleUrls: ['./employees-navbar.component.css']
})
export class EmployeesNavbarComponent implements OnInit {


  isMenuCollapsed: boolean = true;
  user: User = {} as User;
  isAuth: boolean = true;
  modalRef?: BsModalRef;
  showImage: boolean = false;
  userPicture: string = '';
  anonymousImage: string = 'Resources/Images/anonymous.png';
  
  hideOrders: boolean = false;
  hideCustomers: boolean = false;
  hideCreditCards: boolean = false;
  hideBankAccounts: boolean = false;
  hideEmployees: boolean = false;
  hideAddresses: boolean = false;
  hideUsers: boolean = false;

  constructor(private authService: AuthService,
    private modalService: BsModalService,
    private router: Router,
    private permissionsService:PermissionsService) {

  }

  ngOnInit(): void {

    this.getAuth();
    this.getUser();
    this.getImage();
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
  private getUser() {
    this.authService.selectUser$.subscribe(value => {
      this.user = value;
    });
    if (this.user.role == 0) {
      this.hideUsers = false;
      this.hideBankAccounts = false;
      this.hideCreditCards = false;
      this.hideEmployees = false;
      this.hideAddresses = false;
      this.hideCustomers = false;
      this.hideOrders = false;
    }

    else if (this.user.role == 1) {
      this.hideUsers = true;
      this.hideBankAccounts = true;
      this.hideCreditCards = true;
      this.hideEmployees = true;
    }
    else if (this.user.role == 2) {
      this.hideUsers = true;
      this.hideBankAccounts = true;
      this.hideCreditCards = true;
      this.hideEmployees = true;
      this.hideAddresses = true;
    }
    else{
      this.hideUsers = true;
      this.hideBankAccounts = true;
      this.hideCreditCards = true;
      this.hideEmployees = true;
      this.hideAddresses = true;
      this.hideCustomers=true;
      this.hideOrders=true;
    }
  }

  private getAuth() {
    this.authService.selectAuth$.subscribe(value => {
      this.isAuth = value;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onClickNo() {
    this.modalService.hide();
  }

  onClickYes() {
    this.modalService.hide();
    this.authService.setAuth(true, this.user);
    this.router.navigate(['/']);
  }

  onOrdersClick() {
    this.permissionsService.setShowEmployees(true);
    this.permissionsService.setShowBankAccounts(true);
    this.permissionsService.setShowAddresses(true);
    this.permissionsService.setShowCreditCards(true);
    this.permissionsService.setShowCustomers(true);
    this.permissionsService.setShowOrders(false);
    this.permissionsService.setShowUsers(true);
  }

  onEmployeesClick() {
    this.permissionsService.setShowEmployees(false);
    this.permissionsService.setShowBankAccounts(true);
    this.permissionsService.setShowAddresses(true);
    this.permissionsService.setShowCreditCards(true);
    this.permissionsService.setShowCustomers(true);
    this.permissionsService.setShowOrders(true);
    this.permissionsService.setShowUsers(true);
  }

  onCustomersClick() {
    this.permissionsService.setShowEmployees(true);
    this.permissionsService.setShowBankAccounts(true);
    this.permissionsService.setShowAddresses(true);
    this.permissionsService.setShowCreditCards(true);
    this.permissionsService.setShowCustomers(false);
    this.permissionsService.setShowOrders(true);
    this.permissionsService.setShowUsers(true);
  }

  onCreditCardsClick() {
    this.permissionsService.setShowEmployees(true);
    this.permissionsService.setShowBankAccounts(true);
    this.permissionsService.setShowAddresses(true);
    this.permissionsService.setShowCreditCards(false);
    this.permissionsService.setShowCustomers(true);
    this.permissionsService.setShowOrders(true);
    this.permissionsService.setShowUsers(true);
  }

  onBankAccountsClick() {
    this.permissionsService.setShowEmployees(true);
    this.permissionsService.setShowBankAccounts(false);
    this.permissionsService.setShowAddresses(true);
    this.permissionsService.setShowCreditCards(true);
    this.permissionsService.setShowCustomers(true);
    this.permissionsService.setShowOrders(true);
    this.permissionsService.setShowUsers(true);
  }

  onAddressesClick() {
    this.permissionsService.setShowEmployees(true);
    this.permissionsService.setShowBankAccounts(true);
    this.permissionsService.setShowAddresses(false);
    this.permissionsService.setShowCreditCards(true);
    this.permissionsService.setShowCustomers(true);
    this.permissionsService.setShowOrders(true);
    this.permissionsService.setShowUsers(true);
  }

  onUsersClick() {
    this.permissionsService.setShowEmployees(true);
    this.permissionsService.setShowBankAccounts(true);
    this.permissionsService.setShowAddresses(true);
    this.permissionsService.setShowCreditCards(true);
    this.permissionsService.setShowCustomers(true);
    this.permissionsService.setShowOrders(true);
    this.permissionsService.setShowUsers(false);
  }



}
