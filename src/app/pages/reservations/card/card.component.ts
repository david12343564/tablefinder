import { Component, Input } from '@angular/core';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  
  faStar = faStar;
  faStarHalf = faStarHalf;

  @Input() reservaciones: any[] = [{hello: "", calificacionResena:'4.3'}];
  @Input() isFuture: boolean = false;

}
