import { Component } from '@angular/core';
import { PrivilegiosService } from 'src/app/shared/services/privilegios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isRestaurant: boolean = false;

  constructor(
    private privilegioService: PrivilegiosService
  ) {
    this.privilegioService.isRestaurant.subscribe((status: boolean) => {
      this.isRestaurant = status;
    });
  }

}
