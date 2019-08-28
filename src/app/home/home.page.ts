import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMap, Environment, GoogleMapOptions, GoogleMaps, Marker, GoogleMapsEvent } from '@ionic-native/google-maps';

import { AccountResourceService } from '../api/services';
import { NotificationService } from '../services/notification.service';
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
              private notification: NotificationService,
              private androidPermissions: AndroidPermissions,
              private locationAccuracy: LocationAccuracy) {

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
    this.accountResource.getAccountUsingGET().subscribe(data => {
      console.log('Account Details' + data.login);
      this.notification.initializeWebSocketConnection(data.login);
    });
  }

  ngOnInit() {

    console.log('ion Init method');
    this.checkGPSPermission();


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
