import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Restaurante } from 'src/app/shared/interfaces/restaurante';
import { TokenService } from './token.service'; 

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  observableRestaurante: BehaviorSubject<Restaurante> | undefined

  restauranteSeleccionado: Restaurante = {
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

  setRestaurante(rest:Restaurante){
    this.restauranteSeleccionado = rest
    this.observableRestaurante?.next(rest)
  }
}
