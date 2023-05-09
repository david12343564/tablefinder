import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mesa-card',
  templateUrl: './mesa-card.component.html',
  styleUrls: ['./mesa-card.component.scss']
})
export class MesaCardComponent {
  @Input() mesas: any[] = [];
}