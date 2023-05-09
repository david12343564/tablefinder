import { Component } from '@angular/core';

import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';
import { RestauranteService } from 'src/app/shared/services/restaurante.service';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { ProductoService } from 'src/app/shared/services/producto.service';

import { BasicRestaurante } from 'src/app/shared/interfaces/restaurante';
import { Producto } from 'src/app/shared/interfaces/producto';
import { Mesa } from 'src/app/shared/interfaces/mesa';

import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  faStar = faStar;
  faStarHalf = faStarHalf;

  isRestaurant: boolean = false;
  mesas: Array<Mesa> = []; 
  productos: Array<Producto> = [];
  productosBebida: Array<Producto> = [];
  productosEntrada: Array<Producto> = [];
  productosPlatoFuerte: Array<Producto> = [];
  productosPostre: Array<Producto> = [];
  restaurante: BasicRestaurante = { nombre: '', descripcion: '', 
                                    direccion:'', calificacion: 0,
                                    telefono: '', imagen: '', 
                                    totalCalif: 0, contadorCalif: 0
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

}
