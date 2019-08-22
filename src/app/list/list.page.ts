import { UtilService } from './../services/util.service';
import { RideRequestComponent } from './../components/ride-request/ride-request.component';
import { QueryResourceService } from 'src/app/api/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;

   rideRequests: any[] = [{}];
  constructor(private queryResourceService: QueryResourceService,
    private util:UtilService) {
  }

  ngOnInit() {
    this.getAllRideRequests();

  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  getAllRideRequests() {
    this.util.createLoader()
      .then(loader => {
    let request: any [];
    this.queryResourceService.getAllOpenBookingsUsingGET({}).subscribe(
      result => {
        console.log('getting all bookings', result);
        this.rideRequests = result;
        console.log(' array getting all bookings', this.rideRequests);
        loader.dismiss();
      },
      err => {
        console.log('err getting all bookings', err);
        loader.dismiss();
      }
    );
  });
}

}