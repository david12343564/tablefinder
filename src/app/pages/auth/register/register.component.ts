import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formRegister: FormGroup

  constructor(formBuilder: FormBuilder){
    this.formRegister = formBuilder.group({
      name: ['',Validators.required],
      email: ['', Validators.required,Validators.email],
      password: ['',Validators.required],
      repeatPassWord: ['', Validators.required]
    })
  }

}
