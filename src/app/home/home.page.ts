import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMap, Environment, GoogleMapOptions, GoogleMaps, Marker, GoogleMapsEvent } from '@ionic-native/google-maps';

import { AccountResourceService } from '../api/services';
import { WebsocketService } from '../services/websocket.service';
import { ModalController } from '@ionic/angular';
import { RideRequestComponent } from '../components/ride-request/ride-request.component';
import { RideDTO, RideDtoWrapper } from '../api/models';
import { DriverService } from '../services/driver.service';
import { NotificationService } from '../services/notification.service';
import { Platform } from '@ionic/angular';
import { JhiWebSocketService } from '../services/jhi-web-socket.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  status = false;
  mapCanvas: GoogleMap;
  locationCoords: any;
  timetest: any;
  constructor(private geoLocation: Geolocation, private accountResource: AccountResourceService,
              private androidPermissions: AndroidPermissions,
              private locationAccuracy: LocationAccuracy,
              private websocket: JhiWebSocketService,
              private modalController: ModalController,
              private driverService: DriverService,
              private platform: Platform,
              private localNotifications: LocalNotifications,
              private backgroundMode: BackgroundMode
              ) {

      this.locationCoords = {
        latitude: '',
        longitude: '',
        accuracy: '',
        timestamp: ''
      };
      this.timetest = Date.now();
    }



  ionViewWillEnter() {
    console.log('ion View DId Load method');

  }
  async openModal(req, id) {
    const modal = await this.modalController.create({
      component: RideRequestComponent,
      componentProps: {
        request: req,
        processInstanceId: id
      }
    });

    await modal.present();
  }
  ngOnInit() {

    console.log('ion Init method');
    this.accountResource.getAccountUsingGET().subscribe(data => {
      console.log('Account Details' + data.login);
      this.websocket.connect(data.login);
      this.driverService.updateDriverDetails(data.login);
      console.log('IOn View Will Enter');
      this.websocket.subscribe();
      this.websocket.receive().subscribe(
           wrapper =>
           {
              const request: any = {};
              request.distance = '10';
              request.pickUp = wrapper.rideDTO.addressStartingPoint;
              request.destination = wrapper.rideDTO.addressDestination;
              if(this.backgroundMode.isEnabled)
              {
                if(this.platform.is('android'))
                {
                let list: string[] = ['From : '+request.pickUp, 'To : '+request.destination ];
                this.localNotifications.schedule({
                  title: 'Drivo',
                  text: list,
                  foreground: true,
                  wakeup: true,
                  lockscreen: true,
                  sound: 'file://assets/sounds/beep.mp3'
                });
              }
              }
              this.openModal(request, wrapper.processInstanceId);
           });
          },
          error=>
          {if (this.websocket.stompClient && this.websocket.stompClient.connected) {
            this.websocket.disconnect();
        }});






  }
  showMap() {
    console.log('loadMap');

    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c'
    });
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.locationCoords.latitude,
          lng: this.locationCoords.longitude
        },
        zoom: 14,
        tilt: 30
      }
    };
    this.mapCanvas = GoogleMaps.create('map_canvas', mapOptions);
    const marker: Marker = this.mapCanvas.addMarkerSync({
      title: 'newyork city',
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: this.locationCoords.latitude,
        lng: this.locationCoords.longitude,

      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

  // Check if application having GPS access permission
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          // If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          // If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }


  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
      } else {
        // Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              // Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error);
            }
          );
      }
    });
  }
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates();
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }

  getLocationCoordinates() {
    this.geoLocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
      this.showMap();
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }

}
