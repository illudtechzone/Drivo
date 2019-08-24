import { RideDTO } from './../../../../src/app/api/models/ride-dto';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform, ModalController } from '@ionic/angular';
import { RideRequestComponent } from '../components/ride-request/ride-request.component';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private serverUrl = ' //35.232.29.128:8082/websocket/tracker';
  private title = 'WebSockets chat';
  private stompClient;

  constructor( private localNotifications: LocalNotifications, private platform: Platform,private modalController: ModalController

  ) {

  }
display()
{
  console.log("hello world");
}
initializeWebSocketConnection(userName ) {


  const ws = new SockJS(this.serverUrl);
  this.stompClient = Stomp.over(ws);
  const that = this;


  this.stompClient.connect({login: userName }, function(frame) {
    that.stompClient.subscribe('/user/topic/reply', message => {
      if (message.body) {
        

          // tslint:disable-next-line: no-unused-expression
         let rideDto: RideDTO=message.body;
          let request;
          request.distance=''+rideDto.totalDistance;
          request.pickUp=rideDto.addressStartingPoint;
          request.destination=rideDto.addressDestination;
          let requestModal = this.modalController.create(RideRequestComponent, { request: request});
          requestModal.present();





      

      }




});
});
}
}
