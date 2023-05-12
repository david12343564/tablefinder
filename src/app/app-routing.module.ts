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
import { EditarComponent } from './pages/editar/editar.component';
import { NuevaMesaComponent } from './pages/dashboard/nueva-mesa/nueva-mesa.component';
import { NuevaComidaComponent } from './pages/dashboard/nueva-comida/nueva-comida.component';
import { DetalleReservaComponent } from './pages/actividad/detalle-reserva/detalle-reserva.component';
import { CodeComponent } from './pages/reservations/code/code.component';
import { ReviewComponent } from './pages/reservations/review/review.component';


const routes: Routes = [
  //home
  { path: '', component: HomeComponent },
  //login, register
  { path: 'auth', component: AuthComponent },
  { path: 'noAuth', component: NoAuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // vistas publicas
  { path: 'details/:id', component: DetailsComponent },
  { path: 'search', component: SearchComponent },

  // vistas privadas Cliente
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard] },

  //vistas privadas Restaurante
  {path: 'actividad', component: ActividadComponent, canActivate: [AuthGuard]},
  {path: 'actividad/:id', component: DetalleReservaComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'editar', component: EditarComponent, canActivate: [AuthGuard]},
  {path: 'mesa', component: NuevaMesaComponent, canActivate: [AuthGuard]},
  {path: 'mesa/:id', component: NuevaMesaComponent, canActivate: [AuthGuard]},
  {path: 'comida', component: NuevaComidaComponent, canActivate: [AuthGuard]},
  {path: 'comida/:id', component: NuevaComidaComponent, canActivate: [AuthGuard]},
  {path: 'code/:id', component: CodeComponent, canActivate: [AuthGuard]},
  {path: 'review/:id', component: ReviewComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
