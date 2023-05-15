import { Component, Input } from '@angular/core';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { Mesa } from 'src/app/shared/interfaces/mesa';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { ReservationInit } from 'src/app/shared/interfaces/reservation';

@Component({
  selector: 'app-mesa-reservar',
  templateUrl: './mesa-reservar.component.html',
  styleUrls: ['./mesa-reservar.component.scss']
})
export class MesaReservarComponent {
  @Input() mesas: any[] = [];
  @Input() reservacionIniciada: ReservationInit = {
    dia: '',
    hora: '',
    idMesa: '',
    idRestaurante: '',
    idCliente: ''
  }
  
  constructor(
    private reservationService:ReservationService
  ) { }

 setReserva(idMesa: string) {
   this.reservacionIniciada.idMesa = idMesa;
   this.reservationService.setReservationInit(this.reservacionIniciada);
   console.log(this.reservacionIniciada)
 }

}
