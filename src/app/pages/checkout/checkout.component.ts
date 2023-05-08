import { Component } from '@angular/core';
import { faHospital} from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
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
  
  public openCity(evt:any) {
    var i, tablinks;
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
  }
  public contadormas (index: any) {
    //document.getElementById(`${index}`).value++;
  }

  public contadormenos (index: any) {
    //var cant = document.getElementById(`${index}`).value--;
  }
  
}
