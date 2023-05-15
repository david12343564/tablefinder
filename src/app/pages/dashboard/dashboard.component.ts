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
  typeHorario = {
    lunes: 'horario',
    martes: 'horario',
    miercoles: 'horario',
    jueves: 'horario',
    viernes: 'horario',
    sabado: 'horario',
    domingo: 'horario',
  }
  restaurante: BasicRestaurante = { nombre: '', descripcion: '', 
                                    direccion:'', calificacion: 0,
                                    imgUrl: '',
                                    totalCalif: 0, contadorCalif: 0,
                                    horario:{
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
    this.restauranteService.getRestaurant().subscribe((data: any) => {
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
        
        if (this.horario[key][0] == '00:00' && this.horario[key][1] == '00:00'){
          this.horario[key][0] = 'Cerrado'; this.horario[key][1] = '';
        } else if (this.horario[key][0] == '00:00' && this.horario[key][1] == '23:59'){
          this.horario[key][0] = 'Abierto 24 hrs'; this.horario[key][1] = '';
        }
      });
  }

  isHorario(entrada:string, salida: string){
    return !this.isCerrado(entrada, salida) && !this.isAllDay(entrada, salida)
  }

  isCerrado(entrada:string, salida: string){
    return (entrada == '00:00' && salida == '00:00')
  }
  
  isAllDay(entrada:string, salida: string){
    return (entrada == '01:00' && salida == '23:59')
  }

  eventMesa($event:any) {
    this.mesaService.getMesas().subscribe((data:any) => {
      this.mesas = data
      console.log(this.mesas)
    })
  }
  
  eventProducto($event:any) {
    this.productoService.getProductos().subscribe((data:any) => {
      this.productos = data
      this.productosPostre = [];
      this.productosPlatoFuerte = [];
      this.productosEntrada = [];
      this.productosBebida = [];
      console.log(this.mesas)
      
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
        }})
    })
  }
  
  
}
