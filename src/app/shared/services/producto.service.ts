import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { TokenService } from './token.service';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  observableProducto: BehaviorSubject<Producto>;

  productoSeleccionado: Producto = {
    _id: '', nombre: '', descripcion: '',
    foto: '', precio: 0, categoria: ''
  }

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { this.observableProducto = new BehaviorSubject(this.productoSeleccionado); }

  getProductos(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    return this.httpClient.get('http://localhost:3000/productos/restaurante', { headers });
  }

  getProductoById(id: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/productos/' + id);
  }

  addProducto(data: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken(),
      'enctype': 'multipart/form-data' // This is needed for sending form data
    });
    return this.httpClient.post('http://localhost:3000/productos/', data, { headers });
  }

  modifyProducto(producto: any, id: string): Observable<any> {
    return this.httpClient.put('http://localhost:3000/productos/' + id, producto)
  }

  deleteProducto(id: string): Observable<any> {
    return this.httpClient.delete('http://localhost:3000/productos/' + id)
  }


  setProducto(producto: Producto): void {
    this.productoSeleccionado = producto;
    this.observableProducto.next(producto);
  }

  getProducto(): Producto {
    return this.productoSeleccionado;
  }
}
