import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DeliveryArrangementsComponent } from './components/delivery-arrangements/delivery-arrangements.component';
import { MainComponent } from './components/main/main.component';
import { PaymnetComponent } from './components/paymnet/paymnet.component';
import { ProductComponent } from './components/product/product.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
 {path:'',component:MainComponent},
 {path:'products',component:MainComponent},
 {path:'product/:id',component:ProductComponent},
 {path:'cart',component:CartComponent},
 {path:'contactUs',component:ContactUsComponent},
 {path:'logIn',component:SignInComponent},
 {path:'signUp',component:SignUpComponent},
 {path:'deliveryArrangements',component:DeliveryArrangementsComponent},
 {path:'paymnet',component:PaymnetComponent},
 {path:'**',redirectTo:'/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
