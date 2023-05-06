import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

import { TokenService } from 'src/app/services/token.service'; 
import { LoginService } from 'src/app/services/login.service'; 
import { PrivilegiosService } from 'src/app/services/privilegios.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  
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
    this.privilegioService.isRestaurant.subscribe((privilegio: boolean) => {
      this.isRestaurant = privilegio;
    });
    
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if(user) {
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
