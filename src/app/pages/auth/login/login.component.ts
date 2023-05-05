import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup

  constructor(formBuilder: FormBuilder){
    this.formLogin = formBuilder.group({
      email: ['', Validators.required,Validators.email],
      password: ['',Validators.required]
    })
  }

}
