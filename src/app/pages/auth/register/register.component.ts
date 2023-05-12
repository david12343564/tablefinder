import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';
import { Cliente } from 'src/app/shared/interfaces/cliente';
import { BasicRestaurante } from 'src/app/shared/interfaces/restaurante';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formRegisterComensal: FormGroup
  formRegisterRestaurantero: FormGroup

  constructor(
    formBuilder: FormBuilder,
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private privilegioService: PrivilegiosService
  ) {
    
    this.privilegioService.isRestaurant.subscribe((privilegio: boolean) => {
      this.isRestaurant = privilegio;
      console.log(this.isRestaurant)  
    });

    this.formRegisterComensal = formBuilder.group({
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
      
    this.formRegisterRestaurantero = formBuilder.group({
      nombreRestaurante: ['', Validators.required],
      descripcion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    },
      {
        validator: this.confirmPassword('password', 'repeatPassword'),
      }
    )
  }

  isRestaurant: boolean = false;
  invalidReq: boolean = false;
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  }
  
  restaurante: BasicRestaurante = {
    email: '',
    password: '',
    nombre: '',
    direccion: '',
    descripcion: '',
    imgUrl:'',
    totalCalif: 0,
    contadorCalif: 0,
    calificacion: 0,
    horario: {
      lunes: ['09:00', '18:00'],
      martes: ['09:00', '18:00'],
      miercoles: ['09:00', '18:00'],
      jueves: ['09:00', '18:00'],
      viernes: ['09:00', '18:00'],
      sabado: ['09:00', '18:00'],
      domingo: ['09:00', '18:00'],
    }
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

  registrarComensal() {
    this.loginService.registerCliente(this.cliente).subscribe((data: any) => {
      // Recibimos el token
      this.tokenService.setToken(data.token);
      // Enviar a home
      this.router.navigate(['/']);
    });

  }

  registrarRestaurante(){
    console.log('registro restaurante')
    console.log(this.restaurante)
    
    this.loginService.registerRestaurante(this.restaurante).subscribe((data: any) => {
      // Recibimos el token
      this.tokenService.setToken(data.token);
      // Enviar a home
      this.router.navigate(['/dashboard']);
    });
  }


}
