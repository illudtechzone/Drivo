import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { GoogleMap, Environment, GoogleMapOptions, GoogleMaps, Marker, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-rider-details',
  templateUrl: './rider-details.page.html',
  styleUrls: ['./rider-details.page.scss'],
})
export class RiderDetailsPage implements OnInit {

    constructor(private geoLocation: Geolocation,
      private navController:NavController) {}

    segmentName:string ='Details';

  mapCanvas: GoogleMap;
  lat = 10.754090;
  lon = 76.547018;
  ngOnInit(): void {

  }

    ionViewWillEnter() {
      console.log('ion view will enter method');
      this.currentLocation();
      }

      navigate() {
        // GoogleMap.
      }

      currentLocation() {
        this.geoLocation.getCurrentPosition().then(resp => {

          this.lat = resp.coords.latitude;
          this.lon = resp.coords.longitude;
        //  alert(resp.coords.latitude);
          this.showMap();

         }, error => {
           console.log('Error getting location', error);
         });
      }

showMap() {

          // This code is necessary for browser
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
  segmentButtonClicked(ev: any) {
    console.log('Segment button clicked', ev.currentTarget.value);
    this.segmentName=ev.currentTarget.value;
    if(this.segmentName =='Map'){
      this.showMap
    }

  }
  arived(){
    this.navController.navigateForward("/startride");
  }
}
