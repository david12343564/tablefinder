import { Component } from '@angular/core';

import { Restaurante } from 'src/app/shared/interfaces/restaurante';
import { RestauranteService } from 'src/app/shared/services/restaurante.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Datos de ejemplo, reemplaza con los datos de tu API
  restaurantes: Array<Restaurante> = [];
  favRestaurantes: Restaurante[] = [];

  constructor(private restauranteService: RestauranteService) {
    this.listarRestaurantes();
  }

  listarRestaurantes() {
    this.restauranteService.listarRestaurantes().subscribe((response: any) => {
      this.restaurantes = response.restaurantes;
    })
  }
}
