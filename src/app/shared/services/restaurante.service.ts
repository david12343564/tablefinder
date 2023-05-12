import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Restaurante } from 'src/app/shared/interfaces/restaurante';
import { TokenService } from './token.service'; 

import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(
    private httpClient: HttpClient, 
    private httpService: HttpService,
    private tokenService: TokenService
  ) { }

  listarRestaurantes(): Observable<Restaurante[]> {
    const url: string = environment.apiUrl + '/restaurantes/all';
    return this.httpService.get<Restaurante[]>(url).pipe(
      map((restaurantesData: any[]) =>
        restaurantesData.map((restauranteData: any) => {
          const restaurante = new Restaurante(restauranteData);
          restaurante.imagen = 'assets/cafe.jpg'; // Asigna la imagen aquí
          return restaurante;
        })
      ),
    );
  }
  
  getRestaurant(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.httpClient.get('http://localhost:3000/restaurantes', { headers });
  }
  
  modifyRestaurante(producto: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.httpClient.put('http://localhost:3000/restaurantes', producto, { headers })
  }
   
  getRestaurantPublico(idRestaurant:string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/restaurantes/' + idRestaurant);
  }
  
}
