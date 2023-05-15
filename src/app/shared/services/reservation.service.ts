import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service'; 
import { Observable, BehaviorSubject } from 'rxjs';

import { ReservationInit } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  observableReservacionInit: BehaviorSubject<ReservationInit>;

  reservacionIniciada: ReservationInit = {
    dia: '',
    hora: '',
    idMesa: '',
    idRestaurante: '',
    idCliente: ''
  }

  constructor(
    private httpClient: HttpClient, 
    private tokenService: TokenService
  ) { this.observableReservacionInit = new BehaviorSubject(this.reservacionIniciada); }

  
  getReservations(isRestaurant: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    console.log(isRestaurant)
    return this.httpClient.get('http://localhost:3000/reservaciones/' + (isRestaurant ? 'restaurante' : 'cliente'), { headers });
  }
  
  getReservation(idReservacion: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/reservaciones/' + idReservacion);
  }
  
  modificarReservation(reservacion: any, id: string): Observable<any> {
    return this.httpClient.put('http://localhost:3000/reservaciones/' + id, reservacion);
  }
  
  agregarReservation(reservacion: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/reservaciones/', reservacion);
  }
  
  setReservationInit(reservacion: ReservationInit): void {
    this.reservacionIniciada = reservacion;
    this.observableReservacionInit.next(reservacion);
  }

  getReservationInit(): ReservationInit {
    return this.reservacionIniciada;
  }

}
