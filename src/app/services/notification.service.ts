import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private serverUrl = ' //localhost:8082/websocket/tracker';
  private title = 'WebSockets chat';
  private stompClient;

  constructor(
    private localNotifications: LocalNotifications,
    private platForm: Platform, private oauthService: OAuthService,private http: HttpClient
  ) {

  }

  initializeWebSocketConnection(userName ) {


    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;


    this.stompClient.connect({login: userName }, function(frame) {
      that.stompClient.subscribe('/user/topic/reply', message => {
        console.log('Message is subscribing..........');
        if (message.body) {
          that.platForm.ready().then(() => {

            that.localNotifications.schedule({
              title: 'Graeshoppe',
              text: message.body,
              foreground: true,
              wakeup: true,
              lockscreen: true,
              sound: 'file://assets/sounds/beep.mp3'
              // data: { secret: key }
            });
          });
          console.log(message.body);
        }
      });
    });
  }
}
