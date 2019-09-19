import { DirectionsService } from './../../services/directions.service';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { CustomerService } from './../../services/customerService/customer.service';
import { Component, OnInit } from '@angular/core';
import { GoogleMap, Environment, GoogleMapOptions, GoogleMaps, Marker, GoogleMapsEvent, GoogleMapsAnimation, MarkerOptions } from '@ionic-native/google-maps';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UtilService } from 'src/app/services/util.service';
import { DriverService } from 'src/app/services/driver.service';
import { RiderDTO } from 'src/app/api/models';

@Component({
  selector: 'app-start-ride',
  templateUrl: './start-ride.page.html',
  styleUrls: ['./start-ride.page.scss'],
})
export class StartRidePage implements OnInit {
  processInstanceId: any = '';

routePoints: any[] = [];

  constructor(private geoLocation: Geolocation,
              private navController: NavController,
              private customerService: CustomerService,
              private commandResourceService: CommandResourceService,
              private queryResourceService: QueryResourceService,
              private directionsService: DirectionsService,
              private util: UtilService,
              private driverService: DriverService) {

    }
rideStatus = 'reached';
isMoreInfo: Boolean = false;
mapCanvas: GoogleMap;
lat = 10.754090;
lon = 76.547018;
riderLocationInfo: any = {};
ngOnInit() {

}





  ionViewWillEnter() {

    console.log('ion view will enter method');
    this.riderLocationInfo = this.customerService.getRiderLocationInfo();
    console.log('rider location info ', this.riderLocationInfo);
    this.rideStatus = 'reached';
    this.directionsService.getDiractions().then(
      (data: any) => {
        this.routePoints = data;
        console.log('>>>got route points >>>>', data);
        console.log('>>>got route points >>>>', this.routePoints);
        this.currentLocation();
      }
      );

    }
    currentLocation() {
      this.geoLocation.getCurrentPosition().then(resp => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
        this.showMap();

       }, error => {
         console.log('Error getting location', error);
       });
    }

showMap() {
      console.log('loadMap');

      console.log('route points', this.routePoints);
      Environment.setEnv({
          API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c',
          API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAwC9dPmp280b4C18RBcGWjInRi9NGxo5c'
        });
      const mapOptions: GoogleMapOptions = {
          camera: {
            target: this.routePoints[0],
            tilt: 60,
            zoom: 18,
            bearing: 140
          },
          controls: {
            compass: true,
            myLocationButton: true,
            myLocation: true,
            zoom: true,
            mapToolbar: true
          },
        };
      this.mapCanvas = GoogleMaps.create('map_canvas', mapOptions);
      this.mapCanvas .moveCamera({
        target: this.routePoints});
      this.mapCanvas.one(GoogleMapsEvent.MAP_READY).then(() => {
          this.mapCanvas.addPolyline({
            points: this.routePoints,
            color: '#AA00FF',
            width: 6,
            geodesic: true,
          }).then((resp) => {
            const markerOptions: MarkerOptions = {
              title: 'Sample Title',
              position: this.routePoints[this.routePoints.length - 1],
              animation: GoogleMapsAnimation.BOUNCE
            };
            this.mapCanvas.addMarker(markerOptions).then((marker: Marker) => {
              marker.showInfoWindow();
            });
          });
        });

      }

startRide() {
  this.util.createLoader()
    .then(loader => {
      loader.present();
      console.log('start ride');
      this.processInstanceId = this.customerService.getRiderLocationInfo().trackingProcessinstanceId;
      console.log('process2 instance id =', this.processInstanceId);
      this.queryResourceService.getTasksUsingGET({processInstanceId: this.processInstanceId}).subscribe((result: any) => {

    console.log('sucess geting task ', result);
    this.commandResourceService.startRideUsingPOST({taskId: result.data[0].id,
      startRide: {status: 'ridestarted'}}).subscribe((result1: any) => {


        this.commandResourceService.sendStatusToCustomerUsingPOST({rideDto: this.driverService.getRideWrapper().rideDTO,
             status: 'ridestarted'}).toPromise().then(x => {
                loader.dismiss();
                console.log('sucess starting ride ', result1);
                this.rideStatus = 'inprogress';
              }).catch(err => {
                  console.log('error on Promise when sending status ');
                });


    }, err => {
      loader.dismiss();
      console.log('error starting  an ride', err);
    });
  }, err => {
    console.log('error geting task an ride', err);
  });
  });

}



endRide() {
  console.log('end ride');
  this.util.createLoader()
    .then(loader => {
      loader.present();
      this.queryResourceService.getTasksUsingGET({processInstanceId: this.processInstanceId}).subscribe((result: any) => {
    console.log('sucess geting task ', result);
    this.commandResourceService.rideCompleteUsingPOST({taskId:  result.data[0].id,
      rideComplete: {status: 'ridecompleted'}}).subscribe((result1: any) => {
        this.commandResourceService.sendStatusToCustomerUsingPOST({rideDto: this.driverService.getRideWrapper().rideDTO,
          status: 'ridecompleted'}).toPromise().then(x => {

            loader.dismiss();
           console.log('sucess ending ride ', result1);
           this.rideStatus = 'finish';
          this.navController.navigateForward('/invoice');
           }).catch(err => {
               console.log('error on Promise when sending status ');
               this.navController.navigateForward('/invoice');
             });

    }, err => {
      loader.dismiss();

      console.log('error ending  an ride', err);
    });
  }, err => {
    console.log('error geting task an ride', err);
  });
  });

}
moreInfo() {
  console.log('clicked');
  this.isMoreInfo = !this.isMoreInfo;
}

}
