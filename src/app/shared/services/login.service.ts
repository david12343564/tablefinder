import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credenciales } from 'src/app/shared/interfaces/credenciales';
import { Cliente } from 'src/app/shared/interfaces/cliente';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient) { }

    login(credenciales: Credenciales, isRestaurant: boolean): Observable<any> {
        return this.httpClient.post('http://localhost:3000/login/' + (isRestaurant ? 'restaurante' : 'cliente'), credenciales);
    }

    googleLogin(idToken: string, isRestaurant: boolean): Observable<any> {
        const url = 'http://localhost:3000/login/' + (isRestaurant ? 'restaurante' : 'cliente') + '/google';
        return this.httpClient.post(url, { googleToken: idToken })
    }

    registerCliente(cliente: Cliente): Observable<any> {
        return this.httpClient.post('http://localhost:3000/clientes', cliente);
    }

    registerRestaurante(formData: FormData): Observable<any> {
        console.log('Este es el form data: '+ formData);
        return this.httpClient.post('http://localhost:3000/restaurantes', formData);
    }
}