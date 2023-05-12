import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestauranteService } from 'src/app/shared/services/restaurante.service';
import { BasicRestaurante, Restaurante } from 'src/app/shared/interfaces/restaurante';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  restaurante: Restaurante;

  constructor(private route: ActivatedRoute, private restauranteService: RestauranteService) {
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
      },
      error => {
        console.error('Error loading restaurant:', error);
      }
    );
  }

}
