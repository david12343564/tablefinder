import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivilegiosService {

  isRestaurant: BehaviorSubject<boolean>;
  privilegio: boolean = false

  constructor() {
    this.isRestaurant = new BehaviorSubject(false);
   }

   setPrivilegio(privilegio: boolean): void {
    this.privilegio = privilegio;
    this.isRestaurant.next(privilegio);
  }

  getPrivilegio(): boolean {
    return this.privilegio;
  }

}