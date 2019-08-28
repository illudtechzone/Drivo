import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Client, Message, over, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { SocketClientState } from './socket-client-state';
import { BehaviorSubject } from 'rxjs';
import { filter, first, switchMap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService  implements OnDestroy {
  private client: Client;
  private state: BehaviorSubject<SocketClientState>;
  private serverUrl = ' //35.232.29.128:8082/websocket/tracker';
  constructor() {
    this.client = over(new SockJS(this.serverUrl));
    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);

   }
initializeWebSocketConnection(userName ) {
  console.log("initializeWebSocketConnection method");
  this.client.connect({login: userName}, () => {
    this.state.next(SocketClientState.CONNECTED);
  });
}

connect(): Observable<Client> {
  return new Observable<Client>(observer => {
    this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
      observer.next(this.client);
    });
  });
}
ngOnDestroy() {
  this.connect().pipe(first()).subscribe(inst => inst.disconnect(null));
}
onMessage(topic: string, handler = WebsocketService.jsonHandler): Observable<any> {
  console.log("onMessage method");
  return this.connect().pipe(first(), switchMap(inst => {
    return new Observable<any>(observer => {
      const subscription: StompSubscription = inst.subscribe(topic, message => {
        observer.next(handler(message));
      });
      return () => inst.unsubscribe(subscription.id);
    });
  }));
}

onPlainMessage(topic: string): Observable<string> {
  return this.onMessage(topic, WebsocketService.textHandler);
}

static jsonHandler(message: Message): any {
  return JSON.parse(message.body);
}

static textHandler(message: Message): string {
  return message.body;
}

}
