import { RiderLocationInfo } from './../../api/models/rider-location-info';
import { Component, OnInit } from '@angular/core';
import { CommandResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-ride-request',
  templateUrl: './ride-request.component.html',
  styleUrls: ['./ride-request.component.scss'],
})
export class RideRequestComponent implements OnInit {

  constructor(private commandResource: CommandResourceService) { }
  riderInfo: RiderLocationInfo = {destination: 'Palakkad - Ponnani Road, Mankara, Kerala 678613',
pickUp: 'Palakkad - Ponnani Rd Pathirippala, Kerala 678642',
distance: '10 km'
};
  ngOnInit() {}

  confirmRequest() {
    this.commandResource.initateWorkflowUsingPOST(this.riderInfo).subscribe(result => {
      console.log('confirmed sucess fully', result);
    },
    err => {
      console.log('error making accept ride', err);

    });
  }

}
