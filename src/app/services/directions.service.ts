import { Observable } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CustomerService } from './customerService/customer.service';
import { Routes } from '@angular/router';
import { GoogleMap } from '@ionic-native/google-maps';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as decodePolyline from 'decode-google-map-polyline';
import { CurrentUserService } from './current-user.service';
declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class DirectionsService {
  customer = this.customerService.getRiderLocationInfo();
  constructor(private http: HttpClient,
              private customerService: CustomerService,
              private geoLocation:Geolocation) { }
  getDiractions(): Promise<any> {

        const directionsService = new google.maps.DirectionsService();
        let directionsRenderer = new google.maps.DirectionsRenderer();
        return new Promise((resolve) => {

    directionsService.route(
      {
        origin: this.customer.pickUp,
        destination: this.customer.destination,
        travelMode: 'DRIVING'
      },
      function(response, status) {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          console.log('got the way ', response.routes[0]);
          console.log('decoded result ', decodePolyline(response.routes[0].overview_polyline));
          resolve(decodePolyline(response.routes[0].overview_polyline));
       }
        // else {
        //   window.alert('Directions request failed due to ' + status);

        // }
      });
    });
  }
  getCurrentLocation():Observable<any>{

    return new Observable(obserbe=>{this.geoLocation.getCurrentPosition().then((resp) => {
      let latlon="";
      latlon = resp.coords.latitude+','+resp.coords.longitude;
    //  alert(resp.coords.latitude);
      return latlon;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    });

  }
}
