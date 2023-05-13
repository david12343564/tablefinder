import { Component, Input } from '@angular/core';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { Mesa } from 'src/app/shared/interfaces/mesa';

@Component({
  selector: 'app-mesa-reservar',
  templateUrl: './mesa-reservar.component.html',
  styleUrls: ['./mesa-reservar.component.scss']
})
export class MesaReservarComponent {
  @Input() mesas: any[] = [];
  
  constructor(private mesaService: MesaService) {
  }
  mesa: Mesa = { _id: '', capacidad: 0, nombreMesa: '', precio: 0 };
  
 setMesa(tarea: Mesa) {
   this.mesa = tarea;
   this.mesaService.setMesa(tarea);
 }

}
