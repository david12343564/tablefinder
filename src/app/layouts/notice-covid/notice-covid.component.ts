import { Component } from '@angular/core';
import { faHospital} from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notice-covid',
  templateUrl: './notice-covid.component.html',
  styleUrls: ['./notice-covid.component.scss']
})
export class NoticeCovidComponent {
  faHospital = faHospital;
  faStar = faStar;
  faStarHalf = faStarHalf;

}
