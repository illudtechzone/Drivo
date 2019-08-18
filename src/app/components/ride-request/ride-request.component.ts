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
              private queryResource: QueryResourceService) { }
 @Input()
request: any;
processInstanceId = '12094';
taskId = '';
  ngOnInit() {}

  confirmRequest() {
    this.queryResource.getTasksUsingGET({processInstanceId: this.processInstanceId}).subscribe(result => {
      console.log('confirmed     fully', result);
      this.taskId = result.data[0].executionId;
      console.log('confirmed     task id',this.taskId);
      this.initiateRide();
    },
    err => {
      console.log('error making accept ride', err);

    });

  }

  initiateRide() {
    // this.commandResource.collectInformationsUsingPOST({taskId: this.taskId, defaultInfoRequest: {destination: this.request.destination,
    //    distance: this.request.distance, pickUp: this.request.pickUp}}).subscribe(result => {
    //    console.log('sucess collectInformations ', result);
    //    
    //  },
    //  err => {
    //    console.log('error collectInformations ', err);
    //  });
    this.navCtrl.navigateForward('/startride');
  }
}
