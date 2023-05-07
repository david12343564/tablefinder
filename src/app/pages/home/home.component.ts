import { Component } from '@angular/core';

import { Restaurante } from 'src/app/shared/interfaces/restaurante';
import { RestauranteService } from 'src/app/shared/services/restaurante.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  restaurantes: Array<Restaurante> = [];
  favRestaurantes: Restaurante[] = [];

  constructor(private restauranteService: RestauranteService) {
    this.listarRestaurantes();
  }

  listarRestaurantes() {
    this.restauranteService.listarRestaurantes().subscribe(
      (restaurantes: Restaurante[]) => {
        console.log('Datos recibidos de la API:', restaurantes);
        // asignar la ruta local de la imagen a cada restaurante
        restaurantes.forEach((restaurante) => {
          // ruta de ejemplo de la imagen en PC
          restaurante.imagen = '/assets/cafe.jpg';
        });

        // Ordena los restaurantes según su contadorCalif en orden descendente
        restaurantes.sort((a, b) => b.contadorCalif - a.contadorCalif);

        // Toma los primeros 4 restaurantes de la lista ordenada
        this.restaurantes = restaurantes.slice(0, 4);

        // Filtra los restaurantes con una calificación entre 4.5 y 5
        const restaurantesFiltrados = restaurantes.filter(
          (restaurante) => restaurante.getRating() >= 4.5 && restaurante.getRating() <= 5
        );

        // función para obtener una muestra aleatoria de los restaurantes filtrados
        const getRandomSample = (arr: Restaurante[], n: number) => {
          const result = new Array(n);
          let len = arr.length;
          const taken = new Array(len);
          if (n > len) {
            throw new RangeError('getRandomSample: more elements taken than available');
          }
          while (n--) {
            const x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
          }
          return result;
        };

        // Asigna la muestra aleatoria a favRestaurantes (reemplaza el "3" con el número de restaurantes favoritos que deseas mostrar)
        this.favRestaurantes = getRandomSample(restaurantesFiltrados, 8);
      },
      (error) => {
        console.error('Error al obtener restaurantes:', error);
      }
    );
  }


}
