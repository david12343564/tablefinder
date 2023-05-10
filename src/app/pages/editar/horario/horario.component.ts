import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent {
  @Input() dia: string = '';
  @Input() horario: Array<string> = ['09:00', '14:00'];

  
  public setOption(evt:any, dia:string) {
    var i, tablinks;
    console.log(dia)

    tablinks = document.getElementsByClassName("btn-" + dia);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    
    evt.currentTarget.className += " active";
  }

  
  ngOnInit(): void {
    console.log(this.horario)
  }

}
