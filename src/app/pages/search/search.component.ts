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
  restaurante: Restaurante = new Restaurante
  

  constructor(private restauranteService: RestauranteService){
    this.traerResturantes()
  }

  traerResturantes(){
    this.restauranteService.listarRestaurantes().subscribe((response)=>{
      this.restaurantes = response
    })
  }

  setRestaurante(restaurante: Restaurante){
    this.restaurante = restaurante
    this.restauranteService.setRestaurante(restaurante)
  }

}
