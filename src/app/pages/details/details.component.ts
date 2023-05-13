import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MesaService } from 'src/app/shared/services/mesa.service';
import { RestauranteService } from 'src/app/shared/services/restaurante.service';
import { BasicRestaurante, Restaurante } from 'src/app/shared/interfaces/restaurante';
import { ResenaService } from 'src/app/shared/services/resena.service';
import { Mesa } from 'src/app/shared/interfaces/mesa';
import { Resena } from 'src/app/shared/interfaces/resena';

import { faStar, faStarHalf, faMapPin } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  restaurante: Restaurante;
  restauranteCali: number = 0;
  mesas: Array<Mesa> = []; 
  resenas: Array<Resena> = []; 

  faStar = faStar;
  faStarHalf = faStarHalf;
  faMapPin = faMapPin;

  constructor(
    private route: ActivatedRoute, 
    private mesaService: MesaService,
    private resenaService:ResenaService,
    private restauranteService: RestauranteService
  ) {
    this.restaurante = new Restaurante();
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

}
