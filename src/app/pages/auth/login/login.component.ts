import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Credenciales } from 'src/app/shared/interfaces/credenciales';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup

  constructor(
    formBuilder: FormBuilder, 
    private loginService: LoginService,
    private tokenService: TokenService, 
    private router: Router,
    private privilegioService: PrivilegiosService
  ) {
    this.formLogin = formBuilder.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  isRestaurant: boolean = false;
  invalidReq: boolean = false;
  credenciales:  Credenciales = { email: '', password: '' };

  iniciarSesion() {
    this.loginService.login(this.credenciales, this.isRestaurant).subscribe((data: any) => {
      this.invalidReq = false;
      // Recibimos el token
      this.tokenService.setToken(data.token);
      // Enviar a tareas
      this.router.navigate(['/']);
    }, error => {
      this.invalidReq = true;
    });
  }

}
