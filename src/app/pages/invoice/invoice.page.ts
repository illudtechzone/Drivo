import { NavController } from '@ionic/angular';
import { CommandResourceService } from 'src/app/api/services/command-resource.service';
import { QueryResourceService } from 'src/app/api/services';
import { CustomerService } from './../../services/customerService/customer.service';
import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  travelInfo: any = {};
  processInstanceId= '';
  constructor(private customerService: CustomerService,
              private queryResourceService: QueryResourceService,
              private commandResourceService: CommandResourceService,
              private navCtrl: NavController,
              private driverService: DriverService) {

   }

  ngOnInit() {

    this.travelInfo = this.customerService.getRiderLocationInfo();
    this.processInstanceId = this.travelInfo.trackingProcessinstanceId;
    console.log('process instace id ', this.processInstanceId);

  }

  cashCollected() {
    this.getTasks();
  }
  getTasks() {
    console.log('process instace id ', this.processInstanceId);
    this.queryResourceService.getTasksUsingGET({processInstanceId: this.processInstanceId}).subscribe(
      (res: any) => {
        console.log('got tasks ', res);
        this.commandResourceService.paymentUsingPOST({taskId: res.data[0].id, paymentStatus: {paymentStatus: 'paid'}}).subscribe(
          res2 => {

            this.commandResourceService.sendStatusToCustomerUsingPOST({rideDto: this.driverService.getRideWrapper().rideDTO,
              status: 'payment completed'}).toPromise().then(x => {
                console.log('payment completed ', res2);
                this.navCtrl.navigateForward('/home');


               }).catch(err => {
                   console.log('error on Promise when sending Paid Status ');

                 });


          }
        );
      }
      );

  }
}
