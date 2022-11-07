import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AccessibilityComponent } from './components/accessibility/accessibility.component';
import { AccontComponent } from './components/accont/accont.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DeliveryArrangementsComponent } from './components/delivery-arrangements/delivery-arrangements.component';
import { EmployeeLogInComponent } from './components/employee-log-in/employee-log-in.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { MainComponent } from './components/main/main.component';
import { PaymnetComponent } from './components/paymnet/paymnet.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ProductComponent } from './components/product/product.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';

const routes: Routes = [
 {path:'',component:MainComponent},
 {path:'main',component:MainComponent},
 {path:'product/:id',component:ProductComponent},
 {path:'cart',component:CartComponent},
 {path:'contactUs',component:ContactUsComponent},
 {path:'logIn',component:SignInComponent},
 {path:'signUp',component:SignUpComponent},
 {path:'deliveryArrangements',component:DeliveryArrangementsComponent},
 {path:'payment',component:PaymnetComponent},
 {path:'account/:id',component:AccontComponent},
 {path:'employee/:id',component:EmployeeComponent},
 {path:'employeeLogIn',component:EmployeeLogInComponent},
 {path:'privacyPolicy',component:PrivacyPolicyComponent},
 {path:'termsOfUse',component:TermsOfUseComponent},
 {path:'accessbility',component:AccessibilityComponent},
 {path:'aboutUs',component:AboutUsComponent},
 {path:'**',component:MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
