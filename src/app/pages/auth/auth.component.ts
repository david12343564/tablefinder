import { Component } from '@angular/core';

import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(
    private privilegioService: PrivilegiosService
  ) {

    this.privilegioService.isRestaurant.subscribe((privilegio: boolean) => {
      this.isRestaurant = privilegio;
    });

  }

  isRestaurant: boolean = false;

  setPrivilegio(privielgio: boolean) {
    this.privilegioService.setPrivilegio(privielgio);
  }

}
