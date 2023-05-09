import { Component } from '@angular/core';
import { faHospital} from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent {
  faHospital = faHospital;
  faStar = faStar;
  faStarHalf = faStarHalf;

  isRestaurant: boolean = false;

  constructor(
    private privilegioService: PrivilegiosService
  ) {
    this.privilegioService.isRestaurant.subscribe((status: boolean) => {
      this.isRestaurant = status;
    });
  }

}
