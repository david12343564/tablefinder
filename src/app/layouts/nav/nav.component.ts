import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

import { TokenService } from 'src/app/shared/services/token.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';
import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent  {

  constructor(
    private tokenService: TokenService,
    private privilegioService: PrivilegiosService,
    public router: Router,
    private socialAuthService: SocialAuthService,
    private loginService: LoginService
  ) {
    this.tokenService.authStatus.subscribe((status: boolean) => {
      this.logueado = status;
    });
    
    this.privilegioService.isRestaurant.subscribe((status: boolean) => {
      this.isRestaurant = status;
    });

    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if (user) {
        console.log('Usuario de Google', user);
        this.loginService.googleLogin(user.idToken, this.isRestaurant).subscribe(response => {
          this.tokenService.setToken(response.token);
          this.router.navigate(['']);
        });
      }
    });
  }


  logueado: boolean = false;
  isRestaurant: boolean = false;

  cerrarSesion() {
    this.tokenService.deleteToken();
    this.privilegioService.setPrivilegio(false);
    this.router.navigate(['/auth']);
  }

}