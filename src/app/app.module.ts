import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  GoogleSigninButtonModule
} from '@abacritt/angularx-social-login';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './layouts/nav/nav.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SearchComponent } from './pages/search/search.component';
import { DetailsComponent } from './pages/details/details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NoticeCovidComponent } from './layouts/notice-covid/notice-covid.component';
import { CardComponent } from './pages/reservations/card/card.component';
import { ActividadComponent } from './pages/actividad/actividad.component';
import { SmallCardComponent } from './pages/actividad/small-card/small-card.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MesaCardComponent } from './pages/dashboard/mesa-card/mesa-card.component';
import { NoAuthComponent } from './pages/no-auth/no-auth.component';
import { ComidaCardComponent } from './pages/dashboard/comida-card/comida-card.component';
import { EditarComponent } from './pages/editar/editar.component';
import { NuevaMesaComponent } from './pages/dashboard/nueva-mesa/nueva-mesa.component';
import { NuevaComidaComponent } from './pages/dashboard/nueva-comida/nueva-comida.component';
import { DetalleReservaComponent } from './pages/actividad/detalle-reserva/detalle-reserva.component';
import { CodeComponent } from './pages/reservations/code/code.component';
import { ReviewComponent } from './pages/reservations/review/review.component';
import { ListaComponent } from './shared/components/lista/lista.component';
import { MesaReservarComponent } from './pages/details/mesa-reservar/mesa-reservar.component';
import { CardResenaComponent } from './pages/details/card-resena/card-resena.component';
import { ProductoCardComponent } from './pages/actividad/producto-card/producto-card.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    AuthComponent,
    SearchComponent,
    DetailsComponent,
    CheckoutComponent,
    ReservationsComponent,
    NoticeCovidComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent,
    ActividadComponent,
    SmallCardComponent,
    DashboardComponent,
    MesaCardComponent,
    NoAuthComponent,
    ComidaCardComponent,
    EditarComponent,
    NuevaMesaComponent,
    NuevaComidaComponent,
    DetalleReservaComponent,
    CodeComponent,
    ReviewComponent,
    ListaComponent,
    MesaReservarComponent,
    CardResenaComponent,
    ProductoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    FontAwesomeModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '264879683267-spjp2jpn7vqorbodu9n6s7mjgf24rn7l.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
