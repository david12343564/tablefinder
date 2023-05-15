import { Component, Input } from '@angular/core';

import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-resena',
  templateUrl: './card-resena.component.html',
  styleUrls: ['./card-resena.component.scss']
})
export class CardResenaComponent {
  @Input() resenas: any[] = [];
  
  faStar = faStar;
  faStarHalf = faStarHalf;

}
