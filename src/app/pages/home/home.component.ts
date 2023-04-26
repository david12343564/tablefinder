import { Component } from '@angular/core';

import { Restaurante } from 'src/app/shared/interfaces/restaurante';
import { RestauranteService } from 'src/app//services/restaurante.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Datos de ejemplo, reemplaza con los datos de tu API
  restaurantes = [
    { nombre: 'La Taberna del Vikingo', rating: 4.6, imagen: 'assets/home/laTabernaDelVikingo.png' },
    { nombre: 'El café de tus ojos', rating: 4.8, imagen: 'assets/home/elCafeDeTusOjos.png' },
    { nombre: 'BurgerWorld', rating: 4.5, imagen: 'assets/home/burgerWorld.png' },
    { nombre: 'La Cucina di Nonna', rating: 4.6, imagen: 'assets/home/laCucinaDiNonna.png' },
  ];

  favRestaurantes = [
    { nombre: 'El Tenedor de Oro', rating: 4.9, imagen: 'assets/home/tenedor.png' },
    { nombre: 'Sushi Time', rating: 4.2, imagen: 'assets/home/sushi.png' },
    { nombre: 'Rincón del Marisco', rating: 4.7, imagen: 'assets/home/marisco.png' },
    { nombre: 'Oculous Inn Stay', rating: 4.6, imagen: 'assets/home/inn.png' },
    { nombre: 'El Tenedor de Oro', rating: 4.9, imagen: 'assets/home/tenedor.png' },
    { nombre: 'Sushi Time', rating: 4.2, imagen: 'assets/home/sushi.png' },
    { nombre: 'Rincón del Marisco', rating: 4.7, imagen: 'assets/home/marisco.png' },
    { nombre: 'Oculous Inn Stay', rating: 4.6, imagen: 'assets/home/inn.png' },

  ];

  constructor() { }

  ngOnInit(): void { }

}
