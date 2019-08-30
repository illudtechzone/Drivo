import { CustomerService } from './../../services/customerService/customer.service';
import { Component, OnInit, Input } from '@angular/core';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { NavController, ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-ride-request',
  templateUrl: './ride-request.component.html',
  styleUrls: ['./ride-request.component.scss'],
})
export class RideRequestComponent implements OnInit {

  constructor(private commandResource: CommandResourceService,
              private navCtrl: NavController,
              private queryResource: QueryResourceService,
              private customerService: CustomerService,
              private util: UtilService,
              private modalController: ModalController
              ) { }
 @Input()
request: any;
@Input()
processInstanceId: string;
taskId = '';
  ngOnInit() {}

  chooseResponse(response: any) {
    this.util.createLoader()
    .then(loader => {

      loader.present();

      console.log('process instance id =', this.request.trackingProcessinstanceId);
      this.queryResource.getTasksUsingGET({processInstanceId: this.request.trackingProcessinstanceId}).subscribe(result => {
      console.log('confirmed     fully', result);
      this.taskId = result.data[0].id;
      console.log('confirmed    task id', this.taskId);
      this.customerService.setRiderLocationInfo(this.request);
      this.sentResponse(response);
      loader.dismiss();

    },
    err => {
      console.log('error making accept ride', err);
      loader.dismiss();
      this.modalController.dismiss();
    });
  });
  }

  sentResponse(response: any) {
    this.util.createLoader()
    .then(loader => {
      loader.present();
      this.commandResource.driverResponseUsingPOST({taskId: this.taskId, driverInfo: {status: response}}).subscribe(result => {
        loader.dismiss();
        console.log('sucess senting Response ', result);
        this.navCtrl.navigateForward('/startride');
        this.modalController.dismiss();
         },
         err => {
           loader.dismiss();
           console.log('error accepting request ', err);
         });
  });
  }
}
