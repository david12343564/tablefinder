import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Mesa } from 'src/app/shared/interfaces/mesa';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';


@Component({
  selector: 'app-nueva-mesa',
  templateUrl: './nueva-mesa.component.html',
  styleUrls: ['./nueva-mesa.component.scss']
})
export class NuevaMesaComponent {

  formLogin: FormGroup
  
  constructor(
    formBuilder: FormBuilder,
    private mesaService: MesaService,
    private router: Router,
    private privilegioService: PrivilegiosService
  ) {
    this.formLogin = formBuilder.group({
      nombreMesa: ['', [Validators.required]],
      capacidad: [0, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(1)]]
    });
    this.privilegioService.isRestaurant.subscribe((privilegio: boolean) => {
      this.isRestaurant = privilegio;
      console.log(this.isRestaurant)  
    });
    if(this.url != '/mesa') {
      this.isNew = false;
      this.mesaService.observableMesa.subscribe((mesa:Mesa) => {
        this.mesa = mesa;
        this.infoMesa.nombreMesa = this.mesa.nombreMesa
        this.infoMesa.capacidad = this.mesa.capacidad
        this.infoMesa.precio = this.mesa.precio
      })
      if(this.mesa._id == '') {
        this.isNew = false;
        this.url = this.router.url.replace('/mesa/','')
        this.mesaService.getMesaById(this.url).subscribe((data:any) => {
          this.mesa = data
          this.infoMesa.nombreMesa = this.mesa.nombreMesa
          this.infoMesa.capacidad = this.mesa.capacidad
          this.infoMesa.precio = this.mesa.precio
        })
      }  
    }
  }
  
  isNew:boolean = true;
  url:string=this.router.url;
  isRestaurant: boolean = false;
  mesa: Mesa = { _id: '', capacidad: 0, nombreMesa: '', precio: 0}
  nextDashboard: boolean = false;
  invalidReq: boolean = false;
  infoMesa = { nombreMesa: '',  capacidad: 1, precio:20 };

  handleMinus() {
    if(this.infoMesa.capacidad > 1)  this.infoMesa.capacidad--;  
  }
  handlePlus() {
    this.infoMesa.capacidad++;    
  }
  
  handleMinusPrecio() {
    if(this.infoMesa.precio > 10)  this.infoMesa.precio--;  
  }
  handlePlusPrecio() {
    this.infoMesa.precio++;    
  }

  nuevaMesa() {
    console.log('nueva Mesa')
    console.log(this.infoMesa)
    this.mesaService.addMesa(this.infoMesa).subscribe((data: any) => { 
      this.invalidReq = false;
      this.router.navigate(['/dashboard'])
     }, error => {
      this.invalidReq = true;
    });

  } 

  mofidicarMesa() {
    console.log('modificar mesa')
    console.log(this.infoMesa)
    this.mesaService.modifyMesa(this.infoMesa, this.mesa._id || '').subscribe((data: any) => { 
      this.invalidReq = false;
      this.router.navigate(['/dashboard'])
     }, error => {
      this.invalidReq = true;
    });
  }

}
