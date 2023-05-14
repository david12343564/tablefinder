import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { faHospital} from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { RestauranteService } from 'src/app/shared/services/restaurante.service';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { ProductoService } from 'src/app/shared/services/producto.service';

import { Producto } from 'src/app/shared/interfaces/producto';
import { ReservationInit } from 'src/app/shared/interfaces/reservation';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  faHospital = faHospital;
  faStar = faStar;
  faStarHalf = faStarHalf;

  formLogin: FormGroup
  invalidReq: boolean = false;
  isRestaurant: boolean = false;
  fechaReserva:string= ''
  reservation: ReservationInit = {
    dia: '',
    hora: '',
    peticiones: 'Inicializando',
    idMesa: '',
    idRestaurante: '',
    idCliente: ''
  }
  restaurante: {nombre:string, calificacion:number } = {
    nombre: '',
    calificacion: 0
  };
  mesa: {nombreMesa: string, precio: number} = {
    nombreMesa: '',
    precio: 0
  }

  month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
           "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]
  day = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  
  productos: Array<Producto> = [];
  productosBebida: Array<Producto> = [];
  productosEntrada: Array<Producto> = [];
  productosPlatoFuerte: Array<Producto> = [];
  productosPostre: Array<Producto> = [];
  orden:any = {}

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private privilegioService: PrivilegiosService,
    private reservationService:ReservationService,
    private restauranteService: RestauranteService,
    private mesaService: MesaService,
    private productoService: ProductoService
  ) {
    this.formLogin = formBuilder.group({
      peticiones: ['', [Validators.required]],
    });
    this.privilegioService.isRestaurant.subscribe((status: boolean) => {
      this.isRestaurant = status;
    });
    this.reservationService.observableReservacionInit.subscribe((reservacion:ReservationInit) => {
      this.reservation = reservacion
      this.reservation.peticiones="";
      this.formatFecha(this.reservation.dia)
      console.log(this.reservation)
    })
    this.restauranteService.getRestauranteById(this.reservation.idRestaurante).subscribe((data:any) => {
      this.restaurante.nombre = data.nombre
      this.restaurante.calificacion = Number((data.contadorCalif === 0) ? '0' : (data.totalCalif / data.contadorCalif).toFixed(2))
      console.log(this.restaurante)
    })
    this.mesaService.getMesaById(this.reservation.idMesa).subscribe((data:any) => {
      console.log(data)
      this.mesa.nombreMesa = data.nombreMesa
      this.mesa.precio = data.precio
      console.log(this.mesa)
    })
    //mandamos a traer todo el menu del restaurante
    this.productoService.getProductos(this.reservation.idRestaurante).subscribe((data:any) => {
      this.productos = data
      this.productos.forEach((item: Producto) => {
        this.orden[item._id] = 0
        this.formLogin.addControl(item._id, formBuilder.control(70, Validators.required));
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
      console.log(this.orden)
    })
  }

  displayContent: { [index: string]: any } = {
    bebidas: 'block', entradas: 'none', platoFuerte: 'none', postre: 'none'
  }
  //modificar esto :s basarse en la página de editar
  public openCity(evt: any, cityName: string) {
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

  formatFecha(fecha:string) {
    let currentFecha = new Date(fecha)
    currentFecha.setDate(currentFecha.getDate() + 1)
    this.fechaReserva = this.day[currentFecha.getDay()] + ', ' + currentFecha.getDate() + ' de ' + this.month[currentFecha.getMonth()] + ', ' + currentFecha.getFullYear()
  }

   
  handleMinusPrecio(idProducto:any) {
    console.log(idProducto)
    if(this.orden[idProducto] != undefined && this.orden[idProducto] > 0  )  this.orden[idProducto]--;
  }
  handlePlusPrecio(idProducto:any) {
    if(this.orden[idProducto] != undefined )  this.orden[idProducto]++;
  }

  nuevaReserva(){    
    let currentFecha = new Date(this.reservation.dia)
    currentFecha.setDate(currentFecha.getDate() + 1)
    currentFecha.setHours(Number(this.reservation.hora.slice(0, this.reservation.hora.indexOf(':'))))
    currentFecha.setMinutes(Number(this.reservation.hora.slice(this.reservation.hora.indexOf(':') + 1)))
    let ordenFinal:any = {}
    
    for (let key in this.orden) {
      if (this.orden[key] > 0) ordenFinal[key] = this.orden[key]
    }
    const reservaFinal = {
      fecha: currentFecha,
      codigo: (Math.random() + 1).toString(36).substring(3),
      orden: ordenFinal,
      peticiones: this.reservation.peticiones,
      idMesa: this.reservation.idMesa,
      idRestaurante: this.reservation.idRestaurante,
      idCliente: this.reservation.idCliente
    }
    console.log(reservaFinal)    

    this.reservationService.agregarReservation(reservaFinal).subscribe((data: any) => { 
      this.invalidReq = false;
      console.log(data)
      this.router.navigate(['/code/'+data._id])
     }, error => {
      this.invalidReq = true;
    });
    
  }
  
}
