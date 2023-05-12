import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { TokenService } from './token.service';
import { Mesa } from '../interfaces/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  observableMesa: BehaviorSubject<Mesa>;

  mesaSeleccionada: Mesa = {
    _id: '', capacidad: 0, nombreMesa: '', precio: 0
  }

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { this.observableMesa = new BehaviorSubject(this.mesaSeleccionada); }

  getMesas(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.httpClient.get('http://localhost:3000/mesas/restaurante', { headers });
  }

  getMesaById(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/mesas/' + id);
  }
  
  addMesa(mesa: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.httpClient.post('http://localhost:3000/mesas/', mesa, { headers })
  }

  modifyMesa(mesa: any, id: string): Observable<any> {
    return this.httpClient.put('http://localhost:3000/mesas/' + id, mesa)
  }

  deleteMesa(id: string): Observable<any> {
    return this.httpClient.delete('http://localhost:3000/mesas/' + id)
  }

  setMesa(mesa: Mesa): void {
    this.mesaSeleccionada = mesa;
    this.observableMesa.next(mesa);
  }

  getMesa(): Mesa {
    return this.mesaSeleccionada;
  }

}
