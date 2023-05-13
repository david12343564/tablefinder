import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from 'src/app/shared/interfaces/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  private apiUrl = 'http://localhost:3000/restaurantes';

  constructor(private http: HttpClient) { }

  listarRestaurantes() {
    return this.http.get<Restaurante[]>(this.apiUrl);
  }

  obtenerRestaurante(id: string) {
    return this.http.get<Restaurante>(`${this.apiUrl}/${id}`);
  }

  crearRestaurante(restaurante: Restaurante) {
    return this.http.post(this.apiUrl, restaurante);
  }

  actualizarRestaurante(id: string, restaurante: Partial<Restaurante>) {
    return this.http.put(`${this.apiUrl}/${id}`, restaurante);
  }

  eliminarRestaurante(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
