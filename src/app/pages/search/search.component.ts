import { Component } from '@angular/core';
import { Restaurante } from 'src/app/shared/interfaces/restaurante';
import { RestauranteService } from 'src/app/shared/services/restaurante.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  
  restaurantes: Array<Restaurante> = []

  restaurante: Restaurante = {
    _id: '',
    nombre: '',
    email: '',
    direccion: '',
    descripcion: '',
    telefono: '',
    password: '',
    horario: {
        lunes: ['00:00', '00:00'],
        martes: ['00:00', '00:00'],
        miercoles: ['00:00', '00:00'],
        jueves: ['00:00', '00:00'],
        viernes: ['00:00', '00:00'],
        sabado: ['00:00', '00:00'],
        domingo: ['00:00', '00:00']
    },
    imagen: '',
    totalCalif: 0,
    contadorCalif: 0,
    status: '',
    getRating: function (): number {
      throw new Error('Function not implemented.');
    }
  }

  constructor(private restauranteService: RestauranteService) { 
    this.traerRest()
  }

  traerRest(){
    this.restauranteService.listarRestaurantes().subscribe((response: any) =>{
      this.restaurantes = response
    })
  }

  setRestaurante(restaurante: Restaurante){
    this.restaurante = restaurante
    this.restauranteService.setRestaurante(restaurante)
  }

}
