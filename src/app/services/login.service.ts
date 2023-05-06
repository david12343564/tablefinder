import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credenciales } from '../shared/interfaces/credenciales'; 

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(credenciales: Credenciales, isRestaurant: boolean): Observable<any> {
    return this.httpClient.post('http://localhost:3000/login/' + (isRestaurant?'restaurante': 'cliente'), credenciales);
  }

  googleLogin(idToken: string, isRestaurant: boolean): Observable<any> {
    const url = 'http://localhost:3000/login/'+ (isRestaurant?'restaurante': 'cliente') +'/google';
    return this.httpClient.post(url, { googleToken: idToken})
  }
}
