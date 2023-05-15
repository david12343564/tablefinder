import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';
import { Cliente } from 'src/app/shared/interfaces/cliente';
import { Restaurante } from 'src/app/shared/interfaces/restaurante';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  restaurante: Restaurante = new Restaurante();
  formRegisterComensal: FormGroup;
  formRegisterRestaurantero: FormGroup;
  selectedFile: File | null = null;
  selectedImageUrl: any = null;
  isRestaurant: boolean = false;
  invalidReq: boolean = false;
  formError: string | null = null;
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  };

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
    if (!this.formRegisterComensal.valid) {
      this.formError = 'Todos los campos son obligatorios.';
      return;
    }
    this.loginService.registerCliente(this.cliente).subscribe(
      (data: any) => {
        // Recibimos el token
        this.tokenService.setToken(data.token);
        // Enviar a home
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status === 0) {
          this.formError = 'Error de red. Por favor, comprueba tu conexión a Internet.';
        } else if (error.message) {
          this.formError = error.message;
        } else {
          this.formError = 'Ha ocurrido un error desconocido.';
        }
      }
    );
  }

  registrarRestaurante() {
    if (!this.formRegisterRestaurantero.valid) {
      this.formError = 'Todos los campos son obligatorios.';
      return;
    }
    console.log('registro restaurante')
    console.log(this.restaurante)
    if (this.formRegisterRestaurantero.valid) {
      const formData = new FormData();
      // Añadir la imagen si se ha seleccionado
      if (this.selectedFile) {
        formData.append('imagen', this.selectedFile);
      }

      // Añadir los otros campos
      formData.append('nombre', this.restaurante.nombre);
      formData.append('descripcion', this.restaurante.descripcion);
      if (this.restaurante.email && this.restaurante.password) {
        formData.append('email', this.restaurante.email);
        formData.append('password', this.restaurante.password);
      } else {
        this.formError = 'Email y contraseña requeridos.';
      }

      this.loginService.registerRestaurante(formData).subscribe((data: any) => {
        // Recibimos el token
        this.tokenService.setToken(data.token);
        // Enviar a home
        this.router.navigate(['/dashboard']);
      },
        (error) => {
          if (error.status === 0) {
            this.formError = 'Error de red. Por favor, comprueba tu conexión a Internet.';
          } else if (error.message) {
            this.formError = error.message;
          } else {
            this.formError = 'Ha ocurrido un error desconocido.';
          }
        }
      );
    }
  }

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files[0]) {
      this.selectedFile = files[0];
      // Image preview
      const reader = new FileReader();
      reader.onload = (e: any) => this.selectedImageUrl = e.target.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
