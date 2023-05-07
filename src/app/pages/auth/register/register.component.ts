import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Cliente } from 'src/app/shared/interfaces/cliente';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formRegister: FormGroup

  constructor(
    formBuilder: FormBuilder,
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.formRegister = formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    },
      {
        validator: this.confirmPassword('password', 'repeatPassword'),
      }
    )
  }

  invalidReq: boolean = false;
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  }

  confirmPassword(password: string, matchingPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[matchingPassword];
      if (control.value !== matchingControl.value) {
        this.invalidReq = true;
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        this.invalidReq = false;
        matchingControl.setErrors(null);
      }
    };
  }

  registrar() {
    this.loginService.register(this.cliente).subscribe((data: any) => {
      // Recibimos el token
      this.tokenService.setToken(data.token);
      // Enviar a home
      this.router.navigate(['/']);
    });

  }


}
