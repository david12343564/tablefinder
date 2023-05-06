import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Restaurante } from 'src/app/shared/interfaces/restaurante';

import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(private httpService: HttpService) { }

  listarRestaurantes() {
    const url: string = environment.apiUrl + '/restaurantes';
    return this.httpService.get(url);
  }

  resenasPorRestaurante(restauranteId: string) {
    const url: string = environment.apiUrl + '/resenas?restaurante=' + restauranteId;
    return this.httpService.get(url);
  }



  //  listarRestaurantes() {
  //   return this.http.get<Restaurante[]>(this.apiUrl);
  // }

  // obtenerRestaurante(id: string) {
  //   return this.http.get<Restaurante>(`${this.apiUrl}/${id}`);
  // }

  // crearRestaurante(restaurante: Restaurante) {
  //   return this.http.post(this.apiUrl, restaurante);
  // }

  // actualizarRestaurante(id: string, restaurante: Partial<Restaurante>) {
  //   return this.http.put(`${this.apiUrl}/${id}`, restaurante);
  // }

  // eliminarRestaurante(id: string) {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }

}
