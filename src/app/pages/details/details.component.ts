import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { RestauranteService } from 'src/app/shared/services/restaurante.service';
import { Restaurante } from 'src/app/shared/interfaces/restaurante';
import { ResenaService } from 'src/app/shared/services/resena.service';
import { Mesa } from 'src/app/shared/interfaces/mesa';
import { Resena } from 'src/app/shared/interfaces/resena';
import { ReservationInit } from 'src/app/shared/interfaces/reservation';
import { TokenService } from 'src/app/shared/services/token.service';
import { ComensalService } from 'src/app/shared/services/comensal.service';

import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { faStar, faStarHalf, faMapPin } from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  formLogin: FormGroup
  restaurante: Restaurante;
  restauranteCali: number = 0;
  mesas: Array<Mesa> = []; 
  resenas: Array<Resena> = []; 
  reservaInit : ReservationInit = {
    dia: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
    hora: formatDate(new Date(), 'HH:mm', 'en'),
    idMesa: '',
    idRestaurante: '',
    idCliente: ''
  }

  faStar = faStar;
  faStarHalf = faStarHalf;
  faMapPin = faMapPin;

  constructor(
    formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private mesaService: MesaService,
    private resenaService:ResenaService,
    private restauranteService: RestauranteService,
    private tokenService: TokenService,
    private comensalService:ComensalService
  ) {
    this.restaurante = new Restaurante();
    this.formLogin = formBuilder.group({
      tiempoReserva: ['', [Validators.required]],
      fechaReserva: ['',Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id === null) {
      console.error('No restaurant ID provided');
      return;
    }

    this.restauranteService.getRestauranteById(id).subscribe(
      restaurante => {
        this.restaurante = restaurante;
        this.restauranteCali = Number((restaurante.contadorCalif === 0) ? '0' : (restaurante.totalCalif / restaurante.contadorCalif).toFixed(2))
        console.log(this.restaurante)
        this.reservaInit.idRestaurante = id
        this.reservaInit.idCliente = this.tokenService.getToken()
        console.log(this.reservaInit)
      },
      error => {
        console.error('Error loading restaurant:', error);
      }
    );

    this.mesaService.getMesasPublico(id).subscribe((data:any) => {
      this.mesas = data
      console.log(this.mesas)
    })
    this.resenaService.getResenaByRestaurante(id).subscribe((data:any) => {
      this.resenas = data
      //aqui mandamos a agregar el nombre del comensal
      this.getComensal()
      console.log(this.resenas)
    })
  }
  
  isHorario(entrada:string, salida: string){
    return !this.isCerrado(entrada, salida) && !this.isAllDay(entrada, salida)
  }

  isCerrado(entrada:string, salida: string){
    return (entrada == '00:00' && salida == '00:00')
  }
  
  isAllDay(entrada:string, salida: string){
    return (entrada == '01:00' && salida == '23:59')
  }

  eventMesa($event:any) {
    this.mesaService.getMesas().subscribe((data:any) => {
      this.mesas = data
      console.log(this.mesas)
    })
  }

  getComensal() {
    const today = new Date();
    this.resenas.forEach((item: Resena) => {
      //get cliente 
      this.comensalService.getComensalDiscreto(item.idCliente).subscribe((data: any) => {
        item.nombreComensal = data.nombre + ' ' + data.apellido
      });
    });
  }

  filtrarMesas(){
    console.log(this.reservaInit) 
  }

}
