import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MesaService } from 'src/app/shared/services/mesa.service';
import { Mesa } from 'src/app/shared/interfaces/mesa';

@Component({
  selector: 'app-mesa-card',
  templateUrl: './mesa-card.component.html',
  styleUrls: ['./mesa-card.component.scss']
})
export class MesaCardComponent {
  @Input() mesas: any[] = [];
  @Output() deleteMesaEvent = new EventEmitter<string>();

  mesa: Mesa = { _id: '', capacidad: 0, nombreMesa: '', precio: 0 };
  invalidReq: boolean = false;

  
  constructor(private mesaService: MesaService) {
   }
  
  setMesa(tarea: Mesa) {
    this.mesa = tarea;
    this.mesaService.setMesa(tarea);
  }
  

  eliminarMesa(id: string) {
    console.log(id)
    this.mesaService.deleteMesa(id).subscribe((data: any) => {
      this.invalidReq = false;
      this.deleteMesaEvent.emit(id)
    }, error => {
      this.invalidReq = true;
    });
  }

}

