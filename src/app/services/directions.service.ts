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
              private customerService: CustomerService) { }
  getDiractions(lat: number, lon: number) {

    console.log('latitude ', lat);
    console.log('longitude ', lon);
    this.initMap();
  // this.http.get('https://maps.googleapis.com/maps/api/directions/json?origin=10.792484,76.498239&destination=10.7862035,76.4766072&key=AIzaSyDrZ4WrM5g4408XnLXpRZ6SjfUfMEQ6juA').subscribe(
  //   (result:any)=>{
  //     console.log('result route is ',result);
  //   },err=>{
  //     console.log('error route is ',err);

  //   }
  // );

    const polyline = 'neuaEejkbUEGc@j@PXl@p@P\\a@f@GHyDtEgC`DoCfDzHbQp@rAbH`JdBtBrCjDn@p@dDbDfIvHfD~CrK~Jo@z@uCrDmJnL}^ld@mVjZmQrTgArAFJ';
    console.log('decoded result ', decodePolyline(polyline));
    console.log('result is >>>###>>>.');
  }

  async initMap(): Promise<any> {
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
          console.log('got the way ', response.routes[0].overview_polyline);
          console.log('decoded result ', decodePolyline(response.routes[0].overview_polyline));
          resolve(decodePolyline(response.routes[0].overview_polyline));
       }
        // else {
        //   window.alert('Directions request failed due to ' + status);

        // }
      });
    });
  }
}
