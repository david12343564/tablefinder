import { Component } from '@angular/core';
import { faHospital} from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';

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

  isRestaurant: boolean = false;
  horario: {[index: string]:any} = {
    lunes: ['00:00','00:00'],
    martes: ['00:00','00:00'],
    miercoles: ['00:00','00:00'],
    jueves: ['00:00','00:00'],
    viernes: ['00:00','00:00'],
    sabado: ['00:00','00:00'],
    domingo: ['00:00','00:00'],
  }
  restaurante: BasicRestaurante = { nombre: '', descripcion: '', 
                                    direccion:'', calificacion: 0,
                                    telefono: '', imagen: '', 
                                    totalCalif: 0, contadorCalif: 0,
                                    horario:{
                                      lunes: [0, 0],
                                      martes: [0, 0],
                                      miercoles: [0, 0],
                                      jueves: [0, 0],
                                      viernes: [0, 0],
                                      sabado: [0, 0],
                                      domingo: [0, 0],
                                    }
                                  };

  constructor(
    private restauranteService: RestauranteService,
    private privilegioService: PrivilegiosService
  ) {
    this.privilegioService.isRestaurant.subscribe((status: boolean) => {
      this.isRestaurant = status;
    });
  }

  ngOnInit(): void {
    this.restauranteService.getReservations().subscribe((data: any) => {
      this.restaurante = data
      this.getHorario();
      console.log(this.restaurante)
      console.log(this.horario)
    });
  }

  getHorario():void {    
    Object.entries(this.restaurante.horario).forEach(
      ([key, value]) => {
        console.log(key, value)
        this.horario[key][0] = '0000' + value[0].toString()
        this.horario[key][1] = '0000' + value[1].toString()
        let size_0 = this.horario[key][0].length
        let size_1 = this.horario[key][1].length
        this.horario[key][0] = this.horario[key][0].substring(size_0-4,size_0-2) 
                     + ':' + this.horario[key][0].substring(size_0-2,size_0)
        this.horario[key][1] = this.horario[key][1].substring(size_1-4,size_1-2) 
                     + ':' + this.horario[key][1].substring(size_1-2,size_1)
      });
  }

  displayContent: {[index: string]:any} = {
    lunes: 'block', martes: 'none', miercoles: 'none', jueves: 'none',
    viernes: 'none', sabado: 'none', domingo: 'none'
  }

  public openTime(evt:any, cityName:string) {
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

}
