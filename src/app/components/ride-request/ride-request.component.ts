import { InitiateRide } from './../../api/models/initiate-ride';
import { CustomerService } from './../../services/customerService/customer.service';
import { RiderLocationInfo } from './../../api/models/rider-location-info';
import { Component, OnInit } from '@angular/core';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ride-request',
  templateUrl: './ride-request.component.html',
  styleUrls: ['./ride-request.component.scss'],
})
export class RideRequestComponent implements OnInit {

  constructor(private commandResource: CommandResourceService,
              private navCtrl: NavController,
              private customerService: CustomerService,
              private queryResource: QueryResourceService) { }
  riderInfo: RiderLocationInfo = {destination: 'Palakkad - Ponnani Road, Mankara, Kerala 678613',
pickUp: 'Palakkad - Ponnani Rd Pathirippala, Kerala 678642',
distance: '10 km'
};
processInstanceId = '';
taskId = '';
  ngOnInit() {}

  confirmRequest() {
    this.queryResource.getTasksUsingGET({processInstanceId: this.processInstanceId}).subscribe(result => {
      console.log('confirmed sucess fully', result);
      this.customerService.setRiderLocationInfo(this.riderInfo);
      this.navCtrl.navigateForward('/startride');
    },
    err => {
      console.log('error making accept ride', err);

    });
    this.initiateRide();
  }

  initiateRide() {
    this.commandResource.collectInformationsUsingPOST({taskId: this.taskId, initiateRide: {destination: this.riderInfo.destination,
      distance: this.riderInfo.distance, pickUp: this.riderInfo.pickUp}}).subscribe(result => {
      console.log('sucess collectInformations ', result);
    },
    err => {
      console.log('error collectInformations ', err);
    });

  }
}
