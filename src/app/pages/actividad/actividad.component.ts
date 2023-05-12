import { Component, OnInit } from '@angular/core';

import { ReservationService } from 'src/app/shared/services/reservation.service'; 
import { Reservation } from 'src/app/shared/interfaces/reservation'; 
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service'; 
import { ComensalService } from 'src/app/shared/services/comensal.service';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { ResenaService } from 'src/app/shared/services/resena.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit  {
  
  reservaciones: Array<Reservation> = [];
  reservacionesPasadas: Array<Reservation> = [];
  reservacionesFuturas: Array<Reservation> = [];

  constructor(
    private reservationService: ReservationService,
    private privilegioService: PrivilegiosService,
    private mesaService: MesaService,
    private comensalService: ComensalService,
    private resenaService: ResenaService
  ) {
    this.privilegioService.isRestaurant.subscribe((privilegio: boolean) => {
      this.isRestaurant = privilegio;
    });
  }
  
  isRestaurant: boolean = false;
  month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
           "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]
  
  ngOnInit(): void {
    this.reservationService.getReservations(true).subscribe((data: any) => {
      this.reservaciones = data;
      this.sortReservaciones();
      console.log(this.reservacionesPasadas)
      console.log(this.reservacionesFuturas)
    });
  }
    
  sortReservaciones() {
    const today = new Date();
    this.reservaciones.forEach((item: Reservation) => {
      //get cliente 
      this.comensalService.getComensalDiscreto(item.idCliente).subscribe((data: any) => {
        item.nombreComensal = data.nombre + ' ' + data.apellido
      });
      //get mesa 
      this.mesaService.getMesaById(item.idMesa).subscribe((data: any) => {
        item.nombreMesa = data.nombreMesa
      });
      //get reseña
      this.resenaService.getResenaByReservacion(item._id).subscribe((data: any) => {
        console.log(data)
        if (data != null) item.calificacionResena = data.calificacion
      });
      //get fecha
      let fecha = new Date(item.fecha)
      item.fecha = new Date(item.fecha)
      item.dia = fecha.getDate() + ' de ' + this.month[fecha.getMonth()] + ', ' + fecha.getFullYear()
      item.hora = fecha.getHours() + ':' +  fecha.getMinutes()
      if (item.fecha < today) {
        this.reservacionesPasadas.push(item)
      } else {
        this.reservacionesFuturas.push(item)
      }
    });
  }
  
}
