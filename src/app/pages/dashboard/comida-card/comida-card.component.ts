import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductoService } from 'src/app/shared/services/producto.service';
import { Producto } from 'src/app/shared/interfaces/producto';

@Component({
  selector: 'app-comida-card',
  templateUrl: './comida-card.component.html',
  styleUrls: ['./comida-card.component.scss']
})
export class ComidaCardComponent {

  @Input() productos: any[] = [];
  @Output() deleteProductoEvent = new EventEmitter<string>();

  producto: Producto = {
    _id: '', nombre: '', descripcion: '',
    foto: '', precio: 0, categoria: '',
  }
  invalidReq: boolean = false;

  constructor(private productoService: ProductoService) {
  }

  setProducto(tarea: Producto) {
    this.producto = tarea;
    this.productoService.setProducto(tarea);
  }

  eliminarProducto(id: string) {
    console.log(id)
    this.productoService.deleteProducto(id).subscribe((data: any) => {
      this.invalidReq = false;
      this.deleteProductoEvent.emit(id)
    }, error => {
      this.invalidReq = true;
    });
  }

}
