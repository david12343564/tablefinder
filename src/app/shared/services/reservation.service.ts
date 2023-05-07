import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service'; 
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private httpClient: HttpClient, 
    private tokenService: TokenService
  ) { }
  
  getReservations(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.httpClient.get('http://localhost:3000/reservaciones/cliente', { headers });
  }

}
