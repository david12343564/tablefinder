import { Component, OnInit } from '@angular/core';

import { TokenService } from 'src/app/shared/services/token.service'; 
import { ReservationService } from 'src/app/shared/services/reservation.service'; 
import { Reservation } from 'src/app/shared/interfaces/reservation'; 
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service'; 

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservaciones: Array<Reservation> = [];
  reservacionesPasadas: Array<Reservation> = [];
  reservacionesFuturas: Array<Reservation> = [];

  constructor(
    //private loginService: LoginService,
    private tokenService: TokenService ,
    private reservationService: ReservationService,
    private privilegioService: PrivilegiosService
  ) {
    this.privilegioService.isRestaurant.subscribe((privilegio: boolean) => {
      this.isRestaurant = privilegio;
    });
  }
  
  isRestaurant: boolean = false;
  
  month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
           "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]
  day = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((data: any) => {
      this.reservaciones = data;
      this.sortReservaciones();
      console.log(this.reservacionesPasadas)
      console.log(this.reservacionesFuturas)
    });
  }
  
  sortReservaciones() {
    const today = new Date();
    this.reservaciones.forEach((item: Reservation) => {
      let fecha = new Date(item.fecha)
      item.fecha = new Date(item.fecha)
      item.dia = this.day[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + this.month[fecha.getMonth()] + ', ' + fecha.getFullYear()
      item.hora = fecha.getHours() + ':' +  fecha.getMinutes()
      if (item.fecha < today) {
        this.reservacionesPasadas.push(item)
      } else {
        this.reservacionesFuturas.push(item)
      }
    });
  }



}
