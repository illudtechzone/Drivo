import { CustomerService } from './../../services/customerService/customer.service';
import { Component, OnInit, Input } from '@angular/core';
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
              private queryResource: QueryResourceService,
              private customerService: CustomerService
              ) { }
 @Input()
request: any;
processInstanceId = '12571';
taskId = '';
  ngOnInit() {}

  chooseResponse(response: any) {
    console.log('process instance id =', this.request.trackingProcessinstanceId);
    this.queryResource.getTasksUsingGET({processInstanceId: this.request.trackingProcessinstanceId}).subscribe(result => {
      console.log('confirmed     fully', result);
      this.taskId = result.data[0].id;
      console.log('confirmed    task id', this.taskId);
      this.customerService.setRiderLocationInfo(this.request);
      this.sentResponse(response);
    },
    err => {
      console.log('error making accept ride', err);

    });

  }

  sentResponse(response: any) {
     this.commandResource.driverResponseUsingPOST({taskId: this.taskId, driverInfo: {status: response}}).subscribe(result => {
           console.log('sucess senting Response ', result);
           this.navCtrl.navigateForward('/startride');
         },
         err => {
           console.log('error accepting request ', err);
         });
  }
}
