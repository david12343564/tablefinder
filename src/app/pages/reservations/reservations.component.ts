import { Component, OnInit } from '@angular/core';

import { ReservationService } from 'src/app/shared/services/reservation.service'; 
import { Reservation } from 'src/app/shared/interfaces/reservation'; 
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service'; 
import { RestauranteService } from 'src/app/shared/services/restaurante.service';
import { MesaService } from 'src/app/shared/services/mesa.service';

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
    private reservationService: ReservationService,
    private privilegioService: PrivilegiosService,
    private restauranteService: RestauranteService,
    private mesaService: MesaService
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
    this.reservationService.getReservations(this.isRestaurant).subscribe((data: any) => {
      this.reservaciones = data;
      this.sortReservaciones();
      console.log(this.reservacionesPasadas)
      console.log(this.reservacionesFuturas)
    });
  }
  
  sortReservaciones() {
    const today = new Date();
    this.reservaciones.forEach((item: Reservation) => {
      //get restaurante 
      this.restauranteService.getRestaurantPublico(item.idRestaurante).subscribe((data: any) => {
        console.log(data)
        item.nombreRestaurante = data.nombre 
      });
      //get mesa 
      this.mesaService.getMesaById(item.idMesa).subscribe((data: any) => {
        item.nombreMesa = data.nombreMesa
      });
      let fecha = new Date(item.fecha)
      item.fecha = new Date(item.fecha)
      item.dia = this.day[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + this.month[fecha.getMonth()] + ', ' + fecha.getFullYear()
      let hora = fecha.getHours().toString().padStart(2, "0") + ':' +  fecha.getMinutes().toString().padStart(2, "0");
      if (item.fecha < today) {
        this.reservacionesPasadas.push(item)
      } else {
        this.reservacionesFuturas.push(item)
      }
    });
  }



}
