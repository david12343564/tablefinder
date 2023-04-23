import { Component } from '@angular/core';
import { faHospital } from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  faHospital = faHospital;
  faStar = faStar;
  faStarHalf = faStarHalf;
}