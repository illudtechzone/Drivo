import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMap, Environment, GoogleMapOptions, GoogleMaps, Marker, GoogleMapsEvent} from '@ionic-native/google-maps';

import { AccountResourceService } from '../api/services';
import { WebsocketService } from '../services/websocket.service';
import { ModalController } from '@ionic/angular';
import { RideRequestComponent } from '../components/ride-request/ride-request.component';
import { RideDTO } from '../api/models';
import { DriverService } from '../services/driver.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  status = false;
mapCanvas: GoogleMap;
lat = 10.754090;
lon = 76.547018;
  constructor(private geoLocation: Geolocation, private accountResource: AccountResourceService,
              private websocket: WebsocketService,private modalController:ModalController,
              private driverService: DriverService) {}


  ionViewWillEnter() {
    console.log('ion View DId Load method');
    this.accountResource.getAccountUsingGET().subscribe(data => {
      console.log('Account Details' + data.login);
      this.driverService.updateDriverDetails(data.login);
      this.websocket.initializeWebSocketConnection(data.login);
      this.websocket.onMessage('/user/topic/reply').subscribe(
        (rideDto: RideDTO)=>{
          let request:any={};
          request.distance='10'
          request.pickUp=rideDto.addressStartingPoint;
          request.destination=rideDto.addressDestination;
          this.openModal(request);

        }
      );

    });
  }
  async openModal(req) {
    const modal = await this.modalController.create({
      component: RideRequestComponent,
      componentProps: {
        request:req
      }
    });

   await modal.present();
  }
  ngOnInit() {

    console.log('ion Init method');
    this.currentLocation();



    }


    currentLocation() {
      this.geoLocation.getCurrentPosition().then((resp) => {

        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
      //  alert(resp.coords.latitude);
        this.showMap();

       }).catch((error) => {
         console.log('Error getting location', error);
       });
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
              lat: this.lat,
              lng: this.lon
            },
            zoom: 14,
            tilt: 30
          }
        };
      this.mapCanvas = GoogleMaps.create('map_canvas', mapOptions);
      const marker: Marker = this.mapCanvas.addMarkerSync({
      title: 'newyork city',
      icon : 'red',
      animation: 'DROP',
      position: {
        lat: this.lat,
        lng: this.lon,

      }
    });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
}
