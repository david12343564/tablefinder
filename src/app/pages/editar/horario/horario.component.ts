import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnChanges {
  first: number = 0;
  @Output() lunesEvent = new EventEmitter<any>();
  @Output() martesEvent = new EventEmitter<any>();
  @Output() miercolesEvent = new EventEmitter<any>();
  @Output() juevesEvent = new EventEmitter<any>();
  @Output() viernesEvent = new EventEmitter<any>();
  @Output() sabadoEvent = new EventEmitter<any>();
  @Output() domingoEvent = new EventEmitter<any>();
  @Input() dia: string = '';
  @Input() timeToSubmit: boolean = false;
  @Input() horarioAll: { [index: string]: any } = {
    lunes: ['', ''],
    martes: ['', ''],
    miercoles: ['', ''],
    jueves: ['', ''],
    viernes: ['', ''],
    sabado: ['', ''],
    domingo: ['', ''],
  }

  formDatos: FormGroup

  constructor(formBuilder: FormBuilder) {
    this.formDatos = formBuilder.group({
      aperturaLunes: ['', [Validators.required]],     cierreLunes: ['', [Validators.required]],     typeLunes: ['', [Validators.required]],
      aperturaMartes: ['', [Validators.required]],    cierreMartes: ['', [Validators.required]],    typeMartes: ['', [Validators.required]],
      aperturaMiercoles: ['', [Validators.required]], cierreMiercoles: ['', [Validators.required]], typeMiercoles: ['', [Validators.required]],
      aperturaJueves: ['', [Validators.required]],    cierreJueves: ['', [Validators.required]],    typeJueves: ['', [Validators.required]],
      aperturaViernes: ['', [Validators.required]],   cierreViernes: ['', [Validators.required]],   typeViernes: ['', [Validators.required]],
      aperturaSabado: ['', [Validators.required]],    cierreSabado: ['', [Validators.required]],    typeSabado: ['', [Validators.required]],
      aperturaDomingo: ['', [Validators.required]],   cierreDomingo: ['', [Validators.required]],   typeDomingo: ['', [Validators.required]],      
    });
  }

  infoRestaurant: { [index: string]: any } = {
    aperturaLunes: '', cierreLunes: '', typeLunes: '',
    aperturaMartes: '', cierreMartes: '', typeMartes: '',
    aperturaMiercoles: '', cierreMiercoles: '', typeMiercoles: '',
    aperturaJueves: '', cierreJueves: '', typeJueves: '',
    aperturaViernes: '', cierreViernes: '', typeViernes: '',
    aperturaSabado: '', cierreSabado: '', typeSabado: '',
    aperturaDomingo: '', cierreDomingo: '', typeDomingo: '',
  };

  public setOption(evt: any, dia: string) {
    var i, tablinks;
    const currentId = evt.currentTarget.id
    const type = currentId.substring(0, currentId.indexOf("_"))
    console.log(dia)
    console.log(type)
    tablinks = document.getElementsByClassName("btn-" + dia);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    if(type=='allDay'){
      this.infoRestaurant['apertura'+dia]=='01:00' && this.infoRestaurant['cierre'+dia]=='23:59'
    } else if (type == 'noOpen'){
      this.infoRestaurant['apertura'+dia]=='00:00' && this.infoRestaurant['cierre'+dia]=='00:00'
    } 

    this.infoRestaurant['type'+dia] = type;
    evt.currentTarget.className += " active";
  }

  ngOnChanges(changes: SimpleChanges): void {
    const week = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    if(this.first < 2){
      console.log('doing this')
      for (let day in week) {
        console.log(week[day])
        this.infoRestaurant['apertura' + week[day]] = this.horarioAll[week[day].toLowerCase()][0]
        this.infoRestaurant['cierre' + week[day]] = this.horarioAll[week[day].toLowerCase()][1]
        if (this.infoRestaurant['apertura' + week[day]] == '01:00' && this.infoRestaurant['cierre' + week[day]] == '23:59') {
          this.infoRestaurant['type' + week[day]] = 'allDay'
        } else if (this.infoRestaurant['apertura' + week[day]] == '00:00' && this.infoRestaurant['cierre' + week[day]] == '00:00') {
          this.infoRestaurant['type' + week[day]] = 'noOpen'
        } else {
          this.infoRestaurant['type' + week[day]] = 'horario'
        }
      }
      this.first ++;
    }
    this.sendEvents()
  }

  sendEvents(){
    this.lunesEvent.emit({day: this.dia, 
      apertura: this.infoRestaurant['apertura' + this.dia],
      cierre: this.infoRestaurant['cierre' + this.dia],
      type: this.infoRestaurant['type' + this.dia]
    })
    this.martesEvent.emit({day: this.dia, 
      apertura: this.infoRestaurant['apertura' + this.dia],
      cierre: this.infoRestaurant['cierre' + this.dia],
      type: this.infoRestaurant['type' + this.dia]
    })
    this.miercolesEvent.emit({day: this.dia, 
      apertura: this.infoRestaurant['apertura' + this.dia],
      cierre: this.infoRestaurant['cierre' + this.dia],
      type: this.infoRestaurant['type' + this.dia]
    })
    this.juevesEvent.emit({day: this.dia, 
      apertura: this.infoRestaurant['apertura' + this.dia],
      cierre: this.infoRestaurant['cierre' + this.dia],
      type: this.infoRestaurant['type' + this.dia]
    })
    this.viernesEvent.emit({day: this.dia, 
      apertura: this.infoRestaurant['apertura' + this.dia],
      cierre: this.infoRestaurant['cierre' + this.dia],
      type: this.infoRestaurant['type' + this.dia]
    })
    this.sabadoEvent.emit({day: this.dia, 
      apertura: this.infoRestaurant['apertura' + this.dia],
      cierre: this.infoRestaurant['cierre' + this.dia],
      type: this.infoRestaurant['type' + this.dia]
    })
    this.domingoEvent.emit({day: this.dia, 
      apertura: this.infoRestaurant['apertura' + this.dia],
      cierre: this.infoRestaurant['cierre' + this.dia],
      type: this.infoRestaurant['type' + this.dia]
    })
  }

}
