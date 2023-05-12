import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Resena } from 'src/app/shared/interfaces/resena';
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { ResenaService } from 'src/app/shared/services/resena.service';
import { RestauranteService } from 'src/app/shared/services/restaurante.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {

  formReview: FormGroup

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private privilegioService: PrivilegiosService,
    private reservationService: ReservationService,
    private resenaService: ResenaService,
    private restauranteService: RestauranteService
  ) {
    this.formReview = formBuilder.group({
      comentario: ['', [Validators.required]],
      calificacion: ['0', [Validators.required, Validators.min(1)]]
    });

    this.privilegioService.isRestaurant.subscribe((privilegio: boolean) => {
      this.isRestaurant = privilegio;
      console.log(this.isRestaurant)
    });

    this.url = this.router.url.replace('/review/', '')
    //get reservation
    this.reservationService.getReservation(this.url).subscribe((data: any) => {
      console.log(data)
      //get restaurante
      this.restauranteService.getRestaurantPublico(data.idRestaurante).subscribe((data: any) => {
        this.nombreRestaurante = data.nombre;
      });
      if (data.idResena != undefined) this.resena._id = data.idResena
      this.fechaReservacion = this.getDate(data.fecha);
      if (this.resena._id != undefined) {
        console.log('Mandamos a traer la reseña, es una modificación')
        //get reseña
        this.resenaService.getResenaById(this.resena._id).subscribe((data: any) => {
          this.resena.calificacion = data.calificacion.toString()
          this.resena.comentario = data.comentario
        })
      } else {
        console.log('Estamos creando desde 0 una reseña')
        this.isNew = true;
        this.resena.idCliente = data.idCliente
        this.resena.idRestaurante = data.idRestaurante
        this.resena.idReservacion = this.url
      }
    })

  }

  url: string = this.router.url;
  isRestaurant: boolean = false;
  isNew: boolean = false;
  invalidReq: boolean = false;
  fechaReservacion: string = ''
  nombreRestaurante: string = ''

  month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  day = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]


  resena: Resena = {
    comentario: '',
    calificacion: '1',
    idRestaurante: '',
    idCliente: '',
    idReservacion: '',
  }

  nuevaResena() {
    console.log('nueva Resena')
    console.log(this.resena)
    this.resenaService.addResena(this.resena).subscribe((data: any) => {
      this.invalidReq = false;
      console.log(data._id)
      //actualizamos la reservacion para ligarla a esta reseña
      this.reservationService.modificarReservation({
        idResena: data._id,
      }, this.resena.idReservacion
      ).subscribe((data: any) => {
        this.invalidReq = false;
        this.router.navigate(['/reservations'])
      })
    }, error => {
      this.invalidReq = true;
    });
  }

  modificarResena() {
    console.log('modificar Resena')
    console.log(this.resena)
    this.resenaService.modificarResena({
      comentario: this.resena.comentario,
      calificacion: this.resena.calificacion,
    }, this.resena._id || ''
    ).subscribe((data: any) => {
      this.invalidReq = false;
      this.router.navigate(['/reservations'])
    }, error => {
      this.invalidReq = true;
    });
  }

  getDate(currentDate: string) {
    let fecha = new Date(currentDate)
    let dia = this.day[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + this.month[fecha.getMonth()] + ', ' + fecha.getFullYear()
    let hora = fecha.getHours().toString().padStart(2, "0") + ':' + fecha.getMinutes().toString().padStart(2, "0");
    console.log(dia)
    console.log(hora)
    return dia + ' - ' + hora
  }

}
