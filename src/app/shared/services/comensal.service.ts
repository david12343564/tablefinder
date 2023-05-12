import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComensalService {

  constructor(
    private httpClient: HttpClient
  ) { }
  
  getComensalDiscreto(comensal: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/clientes/' + comensal);
  }
  
}
