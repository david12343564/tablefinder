import { Component, Output, EventEmitter } from '@angular/core';

import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';
import { RestauranteService } from 'src/app/shared/services/restaurante.service';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { ProductoService } from 'src/app/shared/services/producto.service';

import { BasicRestaurante } from 'src/app/shared/interfaces/restaurante';
import { Producto } from 'src/app/shared/interfaces/producto';
import { Mesa } from 'src/app/shared/interfaces/mesa';

import { faStar, faStarHalf, faMapPin } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  faStar = faStar;
  faStarHalf = faStarHalf;
  faMapPin = faMapPin;

  @Output() onSelected: EventEmitter<any> = new EventEmitter();

  isRestaurant: boolean = false;
  mesas: Array<Mesa> = []; 
  productos: Array<Producto> = [];
  productosBebida: Array<Producto> = [];
  productosEntrada: Array<Producto> = [];
  productosPlatoFuerte: Array<Producto> = [];
  productosPostre: Array<Producto> = [];
  
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
    private privilegioService: PrivilegiosService,
    private restauranteService: RestauranteService,
    private mesaService: MesaService,
    private productoService: ProductoService
  ) {
    this.privilegioService.isRestaurant.subscribe((status: boolean) => {
      this.isRestaurant = status;
    });
  }
  
  ngOnInit(): void {
    this.restauranteService.getReservations().subscribe((data: any) => {
      this.restaurante = data
      this.restaurante.calificacion = Number((data.contadorCalif === 0) ? '0' : (data.totalCalif / data.contadorCalif).toFixed(2))
      this.getHorario()
      console.log(this.restaurante)
    });
    this.mesaService.getMesas().subscribe((data:any) => {
      this.mesas = data
      console.log(this.mesas)
    })
    this.productoService.getProductos().subscribe((data:any) => {
      this.productos = data
      this.productos.forEach((item: Producto) => {
        switch (item.categoria){
          case 'postre':
            this.productosPostre.push(item);
            break;
          case 'platoFuerte':
            this.productosPlatoFuerte.push(item);
            break;
          case 'entrada':
            this.productosEntrada.push(item);
            break;
          case 'bebida':
            this.productosBebida.push(item);
            break;
        }
      })
      console.log(this.productos)
    })
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
                     + ':' + this.horario[key][0].substring(size_0-2,size_0) + ' - '
        this.horario[key][1] = this.horario[key][1].substring(size_1-4,size_1-2) 
                     + ':' + this.horario[key][1].substring(size_1-2,size_1)
                    
        if (this.horario[key][0] == '00:00 - ' && this.horario[key][1] == '00:00'){
          this.horario[key][0] = 'Cerrado'; this.horario[key][1] = '';
        } else if (this.horario[key][0] == '01:00 - ' && this.horario[key][1] == '23:59'){
          this.horario[key][0] = 'Abierto 24 hrs'; this.horario[key][1] = '';
        }
      });
  }
  
}
