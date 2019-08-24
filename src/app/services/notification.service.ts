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

  private serverUrl = ' //localhost:8082/websocket/tracker';
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
        that.platform.ready().then(() => {


          let requestModal = this.modalController.create(RideRequestComponent, { request: message.body });
          requestModal.present();





        });

      }




});
});
}
}
