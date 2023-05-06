import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Credenciales } from 'src/app/shared/interfaces/credenciales';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  formLogin: FormGroup

  constructor(formBuilder: FormBuilder, private loginService: LoginService,
    private tokenService: TokenService, private router: Router){
    this.formLogin = formBuilder.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  
  credenciales:  Credenciales = { email: '', password: '' };

  iniciarSesion() {
    console.log(this.credenciales)
    this.loginService.login(this.credenciales).subscribe((data: any) => {
      // Recibimos el token
      this.tokenService.setToken(data.token);
      // Enviar a tareas
      this.router.navigate(['/']);
    });
  }

}
