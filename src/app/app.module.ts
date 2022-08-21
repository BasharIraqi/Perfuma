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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

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
    DialogComponent,
    SidenavComponent,
    
  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
