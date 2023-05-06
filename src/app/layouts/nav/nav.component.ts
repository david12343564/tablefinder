import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from 'src/app/services/token.service'; 
import { LoginService } from 'src/app/services/login.service'; 


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  
  constructor(
    private tokenService: TokenService,
    public router: Router,
    private loginService: LoginService
  ) {
    this.tokenService.authStatus.subscribe((status: boolean) => {
      this.logueado = status;
    })
  }

  logueado: boolean = false;

  cerrarSesion() {
    this.tokenService.deleteToken();
    this.router.navigate(['/auth']);
  }

}
