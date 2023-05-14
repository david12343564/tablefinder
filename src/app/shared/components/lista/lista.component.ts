import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { faStar, faStarHalf, faMapPin } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {
  buscar: string = ''
  @Input() items: any[] = []
  itemsFiltrados: any[] = []

  faStar = faStar;
  faStarHalf = faStarHalf;
  faMapPin = faMapPin;

  @Output() onSelected: EventEmitter<any> = new EventEmitter()

  ngOnChanges(changes: SimpleChange):void {
    console.log(changes)
    this.itemsFiltrados = this.items
  }

  filtrar(){
    const buscar = this.buscar.toLowerCase()
    this.itemsFiltrados = this.items.filter(item=>{
      return item.nombre?.toLowerCase().includes(buscar)
    })
  }

  seleccionar(item: any){
    this.onSelected.emit(item)
  }
}
