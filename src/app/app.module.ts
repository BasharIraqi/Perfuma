import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent} from './app.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DeliveryArrangementsComponent } from './components/delivery-arrangements/delivery-arrangements.component';
import { PaymnetComponent } from './components/paymnet/paymnet.component';
import { FormsModule } from '@angular/forms';
import { PerfumeIconComponent } from './icons/perfume-icon/perfume-icon.component';
import { FacebookIconComponent } from './icons/facebook-icon/facebook-icon.component';
import { TwitterIconComponent } from './icons/twitter-icon/twitter-icon.component';
import { GoogleIconComponent } from './icons/google-icon/google-icon.component';
import { YoutubeIconComponent } from './icons/youtube-icon/youtube-icon.component';
import { InstgramIconComponent } from './icons/instgram-icon/instgram-icon.component';
import { LinkedinIconComponent } from './icons/linkedin-icon/linkedin-icon.component';
import { AccontComponent } from './components/accont/accont.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FooterComponent } from './components/footer/footer.component';
import { ModalModule,BsModalService } from 'ngx-bootstrap/modal';
import { CheckIconComponent } from './icons/check-icon/check-icon.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { TrashIconComponent } from './icons/trash-icon/trash-icon.component';
import { EmployeeLogInComponent } from './components/employee-log-in/employee-log-in.component';
import { OrdersComponent } from './components/orders/orders.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CreditCardsComponent } from './components/credit-cards/credit-cards.component';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { UsersComponent } from './components/users/users.component';
import { EmployeesNavbarComponent } from './components/employees-navbar/employees-navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AccessibilityComponent } from './components/accessibility/accessibility.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';
import { PageNotAuthorizedComponent } from './components/page-not-authorized/page-not-authorized.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CartComponent,
    ProductComponent,
    SignInComponent,
    SignUpComponent,
    ContactUsComponent,
    DeliveryArrangementsComponent,
    PaymnetComponent,
    PerfumeIconComponent,
    FacebookIconComponent,
    TwitterIconComponent,
    GoogleIconComponent,
    YoutubeIconComponent,
    InstgramIconComponent,
    LinkedinIconComponent,
    AccontComponent,
    EmployeeComponent,
    SidenavComponent,
    NavbarComponent,
    SearchbarComponent,
    FooterComponent,
    CheckIconComponent,
    ImageUploadComponent,
    TrashIconComponent,
    EmployeeLogInComponent,
    OrdersComponent,
    EmployeesComponent,
    CustomersComponent,
    CreditCardsComponent,
    BankAccountsComponent,
    AddressesComponent,
    UsersComponent,
    EmployeesNavbarComponent,
    ProductsComponent,
    AboutUsComponent,
    AccessibilityComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    PageNotFoundComponent,
    PageNotAuthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    TypeaheadModule,
    AlertModule,
    ModalModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
