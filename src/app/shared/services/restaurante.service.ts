import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Restaurante } from 'src/app/shared/interfaces/restaurante';
import { TokenService } from './token.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  observableRestaurante: BehaviorSubject<Restaurante>

  restauranteSelecc: Restaurante = new Restaurante

  constructor(
    private httpClient: HttpClient,
    private httpService: HttpService,
    private tokenService: TokenService
  ) {
    this.observableRestaurante = new BehaviorSubject(this.restauranteSelecc)
  }

  listarRestaurantes(): Observable<Restaurante[]> {
    const url: string = environment.apiUrl + '/restaurantes/all';
    return this.httpService.get<Restaurante[]>(url).pipe(
      map((restaurantesData: any[]) =>
        restaurantesData.map((restauranteData: any) => {
          const restaurante = new Restaurante(restauranteData);
          restaurante.imagen = restauranteData.imgUrl;; // Asigna la imagen aquí
          return restaurante;
        })
      ),
    );
  }

  getRestauranteById(id: string): Observable<Restaurante> {
    const url: string = environment.apiUrl + '/restaurantes/' + id;
    return this.httpService.get<Restaurante>(url).pipe(
      map((restauranteData: any) => {
        const restaurante = new Restaurante(restauranteData);
        restaurante.imagen = restauranteData.imgUrl; // Asigna la imagen aquí
        console.log('Servicio get rest: ', restaurante);
        return restaurante;
      })
    );
  }


  getRestaurant(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.httpClient.get('http://localhost:3000/restaurantes', { headers });
  }

  modifyRestaurante(data: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.httpClient.put('http://localhost:3000/restaurantes', data, { headers })
  }

  getRestaurantPublico(idRestaurant: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/restaurantes/' + idRestaurant);
  }

  setRestaurante(restaurante: Restaurante): void {
    this.restauranteSelecc = restaurante
    this.observableRestaurante.next(restaurante)
  }



}
