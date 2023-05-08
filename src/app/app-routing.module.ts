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

import { AuthGuard } from './shared/guards/auth.guard'; 
import { ActividadComponent } from './pages/actividad/actividad.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoAuthComponent } from './pages/no-auth/no-auth.component';


const routes: Routes = [
  //home
  {path: '', component:HomeComponent},
  //login, register
  {path: 'auth', component:AuthComponent},
  {path: 'noAuth', component:NoAuthComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  // vistas publicas
  {path: 'detalles', component:DetailsComponent},
  {path: 'search',component:SearchComponent},
  
  // vistas privadas Cliente
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard]},

  //vistas privadas Restaurante
  {path: 'actividad', component: ActividadComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
