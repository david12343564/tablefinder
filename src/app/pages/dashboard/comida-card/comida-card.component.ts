import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comida-card',
  templateUrl: './comida-card.component.html',
  styleUrls: ['./comida-card.component.scss']
})
export class ComidaCardComponent {

  @Input() productos: any[] = [];
}
