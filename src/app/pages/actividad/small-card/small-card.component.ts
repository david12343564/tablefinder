import { Component, Input } from '@angular/core';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.scss']
})
export class SmallCardComponent {

  faStar = faStar;
  faStarHalf = faStarHalf;
  
  @Input() reservaciones: any[] = [];
  @Input() isFuture: boolean = false;

}