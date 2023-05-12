import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent {

  constructor(
    private router: Router,
    private privilegioService: PrivilegiosService,
    private reservationService: ReservationService
  ) {
    this.privilegioService.isRestaurant.subscribe((privilegio: boolean) => {
      this.isRestaurant = privilegio;
      console.log(this.isRestaurant)
    });
    
    this.url = this.router.url.replace('/code/', '')
    this.reservationService.getReservation(this.url).subscribe((data: any) => {
      this.code = data.codigo.toUpperCase()
    })

  }

  url: string = this.router.url;
  isRestaurant: boolean = false;
  code: string = '';


}
