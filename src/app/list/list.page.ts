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
  constructor(private queryResourceService: QueryResourceService) {
  }

  ngOnInit() {
    this.getAllRideRequests();

  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  getAllRideRequests() {
    let request: any [];
    this.queryResourceService.getAllOpenBookingsUsingGET({}).subscribe(
      result => {
        console.log('getting all bookings', result);
        this.rideRequests = result;
        console.log(' array getting all bookings', this.rideRequests);
      },
      err => {
        console.log('err getting all bookings', err);
      }
    );
  }
}
