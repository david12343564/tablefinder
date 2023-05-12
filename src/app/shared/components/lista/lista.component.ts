import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnChanges{
  buscar:string = ''
  @Input() items: any[] = []
  itemsFiltrados: any[] = []

  @Output() onSelected: EventEmitter<any> = new EventEmitter

  ngOnChanges(changes: SimpleChanges):void{
    console.log(changes)
    this.itemsFiltrados = this.items
  }

  filtrar(){
    const buscar = this.buscar.toLocaleLowerCase()
    this.itemsFiltrados = this.items.filter(iitem=>{
      return item.nombre?.toLowerCase().includes(buscar)
    })
  }

  seleccionar(item: any){
    this.onSelected.emit(item)
  }
  

}
