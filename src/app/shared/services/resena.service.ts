import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {

  constructor(
    private httpClient: HttpClient
  ) { }
  
  getResenaById(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/resenas/' + id);
  }

  getResenaByRestaurante(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/resenas/restaurante/' + id);
  }
  
  getResenaByCliente(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/resenas/cliente/' + id);
  }
  
  getResenaByReservacion(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/resenas/reservacion/' + id);
  }

  modificarResena(resena: any, id: string): Observable<any> {
    return this.httpClient.put('http://localhost:3000/resenas/' + id, resena);
  }
  
  addResena(resena: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/resenas', resena);
  }
  
}
