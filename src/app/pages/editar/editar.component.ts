import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faHospital } from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BasicRestaurante } from 'src/app/shared/interfaces/restaurante';
import { RestauranteService } from 'src/app/shared/services/restaurante.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent {
  faHospital = faHospital;
  faStar = faStar;
  faStarHalf = faStarHalf;

  formDatos: FormGroup

  infoRestaurant = {
    descripcion: '', ubicacion: '', horario: {
      lunes: ['00:00', '00:00'],
      martes: ['00:00', '00:00'],
      miercoles: ['00:00', '00:00'],
      jueves: ['00:00', '00:00'],
      viernes: ['00:00', '00:00'],
      sabado: ['00:00', '00:00'],
      domingo: ['00:00', '00:00'],
    },
    typeLunes: 'horario', typeMartes: 'horario', typeMiercoles: 'horario',
    typeJueves: 'horario', typeViernes: 'horario', typeSabado: 'horario', typeDomingo: 'horario',      
  };

  isRestaurant: boolean = false;
  getTime: boolean = false;
  invalidReq: boolean = false;
  restaurante: BasicRestaurante = {
    nombre: '', descripcion: '',
    direccion: '', calificacion: 0,
    imgUrl: '',
    totalCalif: 0, contadorCalif: 0,
    horario: {
      lunes: ['00:00', '00:00'],
      martes: ['00:00', '00:00'],
      miercoles: ['00:00', '00:00'],
      jueves: ['00:00', '00:00'],
      viernes: ['00:00', '00:00'],
      sabado: ['00:00', '00:00'],
      domingo: ['00:00', '00:00'],
    }
  };

  constructor(
    private restauranteService: RestauranteService,
    private privilegioService: PrivilegiosService,
    private router: Router,
    formBuilder: FormBuilder
  ) {
    this.privilegioService.isRestaurant.subscribe((status: boolean) => {
      this.isRestaurant = status;
    });
    this.formDatos = formBuilder.group({
      descripcion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      aperturaLunes: ['', [Validators.required]],     cierreLunes: ['', [Validators.required]],     typeLunes: ['', [Validators.required]],
      aperturaMartes: ['', [Validators.required]],    cierreMartes: ['', [Validators.required]],    typeMartes: ['', [Validators.required]],
      aperturaMiercoles: ['', [Validators.required]], cierreMiercoles: ['', [Validators.required]], typeMiercoles: ['', [Validators.required]],
      aperturaJueves: ['', [Validators.required]],    cierreJueves: ['', [Validators.required]],    typeJueves: ['', [Validators.required]],
      aperturaViernes: ['', [Validators.required]],   cierreViernes: ['', [Validators.required]],   typeViernes: ['', [Validators.required]],
      aperturaSabado: ['', [Validators.required]],    cierreSabado: ['', [Validators.required]],    typeSabado: ['', [Validators.required]],
      aperturaDomingo: ['', [Validators.required]],   cierreDomingo: ['', [Validators.required]],   typeDomingo: ['', [Validators.required]],      

    });
  }

  ngOnInit(): void {
    this.restauranteService.getRestaurant().subscribe((data: any) => {
      this.restaurante = data
      this.infoRestaurant.descripcion = this.restaurante.descripcion
      this.infoRestaurant.ubicacion = this.restaurante.direccion
      this.infoRestaurant.horario.lunes[0] = this.restaurante.horario.lunes[0]
      this.infoRestaurant.horario.lunes[1] = this.restaurante.horario.lunes[1]
      this.infoRestaurant.typeLunes = this.getType(this.restaurante.horario.lunes[0], this.restaurante.horario.lunes[1])
      this.infoRestaurant.horario.martes[0] = this.restaurante.horario.martes[0]
      this.infoRestaurant.horario.martes[1] = this.restaurante.horario.martes[1]
      this.infoRestaurant.typeMartes = this.getType(this.restaurante.horario.martes[0], this.restaurante.horario.martes[1])
      this.infoRestaurant.horario.miercoles[0] = this.restaurante.horario.miercoles[0]
      this.infoRestaurant.horario.miercoles[1] = this.restaurante.horario.miercoles[1]
      this.infoRestaurant.typeMiercoles = this.getType(this.restaurante.horario.miercoles[0], this.restaurante.horario.miercoles[1])
      this.infoRestaurant.horario.jueves[0] = this.restaurante.horario.jueves[0]
      this.infoRestaurant.horario.jueves[1] = this.restaurante.horario.jueves[1]
      this.infoRestaurant.typeJueves = this.getType(this.restaurante.horario.jueves[0], this.restaurante.horario.jueves[1])
      this.infoRestaurant.horario.viernes[0] = this.restaurante.horario.viernes[0]
      this.infoRestaurant.horario.viernes[1] = this.restaurante.horario.viernes[1]
      this.infoRestaurant.typeViernes = this.getType(this.restaurante.horario.viernes[0], this.restaurante.horario.viernes[1])
      this.infoRestaurant.horario.sabado[0] = this.restaurante.horario.sabado[0]
      this.infoRestaurant.horario.sabado[1] = this.restaurante.horario.sabado[1]
      this.infoRestaurant.typeSabado = this.getType(this.restaurante.horario.sabado[0], this.restaurante.horario.sabado[1])
      this.infoRestaurant.horario.domingo[0] = this.restaurante.horario.domingo[0]
      this.infoRestaurant.horario.domingo[1] = this.restaurante.horario.domingo[1]
      this.infoRestaurant.typeDomingo = this.getType(this.restaurante.horario.domingo[0], this.restaurante.horario.domingo[1])
      console.log(this.restaurante)
    });
  }
  
  isCerrado(entrada:string, salida: string){
    return (entrada == '00:00' && salida == '00:00')
  }
  
  isAllDay(entrada:string, salida: string){
    return (entrada == '01:00' && salida == '23:59')
  }

  getType(entrada:string, salida: string){
    return this.isCerrado(entrada, salida) ? 'noOpen' : this.isAllDay(entrada, salida) ? 'allDay' : 'horario'
  }
  
  setTime(entrada:string, salida: string, type:string){
    switch(type) {
      case 'noOpen':
        return ["00:00", "00:00"]
      case 'allDay':
        return ["01:00", "23:59"]
      default:
        return [entrada, salida]
      }
  }
  
  displayContent: { [index: string]: any } = {
    lunes: 'block', martes: 'none', miercoles: 'none', jueves: 'none',
    viernes: 'none', sabado: 'none', domingo: 'none'
  }

  public openTime(evt: any, cityName: string) {
    var i, tablinks;
    for (let key in this.displayContent) {
      this.displayContent[key] = 'none'
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    this.displayContent[cityName] = 'block';
    evt.currentTarget.className += " active";
  }

  mofidicarRestaurant() {
    this.infoRestaurant.horario = {
      lunes: this.setTime(this.infoRestaurant.horario.lunes[0], this.infoRestaurant.horario.lunes[1], this.infoRestaurant.typeLunes),
      martes: this.setTime(this.infoRestaurant.horario.martes[0], this.infoRestaurant.horario.martes[1], this.infoRestaurant.typeMartes),
      miercoles: this.setTime(this.infoRestaurant.horario.miercoles[0], this.infoRestaurant.horario.miercoles[1], this.infoRestaurant.typeMiercoles),
      jueves: this.setTime(this.infoRestaurant.horario.jueves[0], this.infoRestaurant.horario.jueves[1], this.infoRestaurant.typeJueves),
      viernes: this.setTime(this.infoRestaurant.horario.viernes[0], this.infoRestaurant.horario.viernes[1], this.infoRestaurant.typeViernes),
      sabado: this.setTime(this.infoRestaurant.horario.sabado[0], this.infoRestaurant.horario.sabado[1], this.infoRestaurant.typeSabado),
      domingo: this.setTime(this.infoRestaurant.horario.domingo[0], this.infoRestaurant.horario.domingo[1], this.infoRestaurant.typeDomingo),
    }
    console.log({descripcion: this.infoRestaurant.descripcion, ubicacion: this.infoRestaurant.ubicacion, horario: this.infoRestaurant.horario})
    
    return this.restauranteService.modifyRestaurante( {
        descripcion: this.infoRestaurant.descripcion, 
        ubicacion: this.infoRestaurant.ubicacion, 
        horario: this.infoRestaurant.horario}
    ).subscribe((data: any) => { 
      this.invalidReq = false;
      this.router.navigate(['/dashboard'])
     }, error => {
      this.invalidReq = true;
    }); 
    
  }

}

