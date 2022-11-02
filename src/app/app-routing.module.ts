import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccontComponent } from './components/accont/accont.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CreditCardsComponent } from './components/credit-cards/credit-cards.component';
import { DeliveryArrangementsComponent } from './components/delivery-arrangements/delivery-arrangements.component';
import { EmployeeLogInComponent } from './components/employee-log-in/employee-log-in.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { MainComponent } from './components/main/main.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PaymnetComponent } from './components/paymnet/paymnet.component';
import { ProductComponent } from './components/product/product.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
 {path:'',component:MainComponent},
 {path:'products',component:MainComponent},
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
 {path:'addresses',component:AddressesComponent},
 {path:'orders',component:OrdersComponent},
 {path:'bankAccounts',component:BankAccountsComponent},
 {path:'users',component:UsersComponent},
 {path:'employees',component:EmployeeComponent},
 {path:'creditCards',component:CreditCardsComponent},
 {path:'**',component:MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
