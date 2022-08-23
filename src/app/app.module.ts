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
import { UserIconComponent } from './icons/user-icon/user-icon.component';
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
    UserIconComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    TypeaheadModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
