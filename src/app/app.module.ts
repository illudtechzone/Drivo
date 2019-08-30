import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UtilService } from './services/util.service';
import { ConfigsModule } from './configs/configs.module';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptor } from './services/security/auth-interceptor';
import { NotificationService } from './services/notification.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';


import { WebsocketService } from './services/websocket.service';
import { RideRequestComponent } from './components/ride-request/ride-request.component';
import { ComponentsModule } from './components/components.module';
import { DriverService } from './services/driver.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [RideRequestComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    OAuthModule.forRoot(),
    HttpClientModule,
    ConfigsModule,  IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    ComponentsModule
  ],
  providers: [
    Camera,
    AndroidPermissions,
    LocationAccuracy,
    UtilService,
    Geolocation,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    NotificationService,
    LocalNotifications,
    WebsocketService,
    DriverService,
    BackgroundMode


  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
