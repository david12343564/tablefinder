import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DetailsComponent } from './pages/details/details.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CheckoutComponent } from './pages/checkout/checkout.component'; 
import { ReservationsComponent } from './pages/reservations/reservations.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'auth', component:AuthComponent},
  {path: 'detalles', component:DetailsComponent},
  {path: 'search',component:SearchComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'reservations', component: ReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
