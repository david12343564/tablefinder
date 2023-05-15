import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ReservationService } from 'src/app/shared/services/reservation.service';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { ProductoService } from 'src/app/shared/services/producto.service';

@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.component.html',
  styleUrls: ['./detalle-reserva.component.scss']
})
export class DetalleReservaComponent {

  //el id de la reserva está en el url
  
  url: string = this.router.url;
  productos: any = []
  pedido:any = {}
  resena:any = {}
  mesa:any = {}
  fecha:any = ''
  code:string = ''
  peticiones:string = ''
  
  month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
           "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]
  day = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private mesaService: MesaService,
    private productoService: ProductoService
    ){
    this.url = this.router.url.replace('/actividad/', '')
    this.reservationService.getReservation(this.url).subscribe((data: any) => {
      this.code = data.codigo.toUpperCase()
      this.peticiones = data.peticiones
      this.fecha = this.getFecha(new Date(data.fecha))
      this.pedido = data.orden
      console.log(data)
      this.mesaService.getMesaById(data.idMesa).subscribe((data: any) => {
        console.log(data)
        this.mesa = data.nombreMesa
      })
      
      for (let key in this.pedido) {
        this.productoService.getProductoById(key).subscribe((data: any) => {
          console.log(data)
          data.cantidad = this.pedido[key]
          this.productos.push(data)
        })
      }
      
      console.log(this.resena)
      console.log(this.mesa)
      console.log(this.fecha)

      console.log(this.productos)
      console.log(this.code)
      console.log(this.peticiones)
    })

  }

  
  getFecha(fecha : Date) {
    let dia = this.day[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + this.month[fecha.getMonth()] + ', ' + fecha.getFullYear()
    let hora = fecha.getHours().toString().padStart(2, "0") + ':' +  fecha.getMinutes().toString().padStart(2, "0");  
    return dia + " - " + hora
  }

}
