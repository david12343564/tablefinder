import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Restaurante } from 'src/app/shared/interfaces/restaurante';

import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(private httpService: HttpService) { }

  listarRestaurantes(): Observable<Restaurante[]> {
    const url: string = environment.apiUrl + '/restaurantes';
    return this.httpService.get<Restaurante[]>(url).pipe(
      map((restaurantesData: any[]) =>
        restaurantesData.map(
          (restauranteData: any) => new Restaurante(restauranteData)
        )
      ),
    );
  }

}
