import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service'; 

@Injectable({
  providedIn: 'root'
})
export class PrivilegiosService {

  isRestaurant: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient, 
    private tokenService: TokenService
  ) {
    this.isRestaurant.next(this.getPrivilegio());
   }

  setPrivilegio(privilegio: boolean): void {
    this.isRestaurant.next(privilegio);
  }
  
  setRole(): void {
    this.isRestaurant.next(this.getPrivilegio());
  }
  
  getRole(): string {
    let role = ''
    const headers = new HttpHeaders({
      'Authorization': this.tokenService.getToken()
    });
    this.httpClient.get('http://localhost:3000/role', 
      { headers }).subscribe((data: any) => {
        this.isRestaurant.next(data.role == 'restaurante')
        role = data.role
        return data.role;
    });
    return role;

  }

  getPrivilegio(): boolean {
    return this.getRole() == 'restaurante';
  }
  

}