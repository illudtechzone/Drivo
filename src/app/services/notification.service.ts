
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { RideRequestComponent } from '../components/ride-request/ride-request.component';
import { RideDTO } from '../api/models';
import { Observer, Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private serverUrl = ' //35.232.29.128:8082/websocket/tracker';
  private title = 'WebSockets chat';
  private stompClient;

  constructor( private localNotifications: LocalNotifications, private platform: Platform, private navController: NavController

  ) {
    // tslint:disable-next-line:no-unused-expression

  }
  observer: Observer<any>;

  createObservable() : Observable<any> {
    return new Observable(observer => {
      this.observer = observer;
    });
}
 initializeWebSocketConnection(userName ):Observable<any>  {


  const ws = new SockJS(this.serverUrl);
  this.stompClient = Stomp.over(ws);
  const that = this;



  this.stompClient.connect({login: userName }, function(frame) {

    that.stompClient.subscribe('/user/topic/reply', message => {
      if (message.body) {


          // tslint:disable-next-line: no-unused-expression
         let rideDto: RideDTO=message.body;
          let request:any={};
          request.distance='10'
          request.pickUp=rideDto.addressStartingPoint;
          request.destination=rideDto.addressDestination;

          this.observer.next(request);


      }




});
});

return this.createObservable();

}


}
