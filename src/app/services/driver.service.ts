import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { QueryResourceService, CommandResourceService, AccountResourceService } from '../api/services';
import { DriverDTO, RideDtoWrapper } from '../api/models';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private oauthService: OAuthService,
              private queryResource: QueryResourceService,
              private commandResource: CommandResourceService,
              private accountResource: AccountResourceService,
              private geoLocation: Geolocation) { }
     driverDTO: DriverDTO = {};
     online = true;
     occupied = false;
      wrapper: RideDtoWrapper;
    updateDriverDetails(userName) {

      this.driverDTO.iDPcode = userName;
      this.commandResource.createDriverIfNotExistUsingPOST(this.driverDTO).subscribe(
        driver => {
          this.driverDTO = driver;
          this.updateDriverLocation();
        }
      );
    }
    setRideWrapper(wrapper: RideDtoWrapper)
    {
      this.wrapper=wrapper;
    }
    getRideWrapper()
    {
      return this.wrapper;
    }



  updateDriverLocation() {
    this.geoLocation.getCurrentPosition().then((resp) => {

    this.driverDTO.location = resp.coords.latitude + ',' + resp.coords.longitude;
    if (this.driverDTO.id) {
      this.commandResource.updateDriverUsingPUT(this.driverDTO).subscribe(
        data => {
          console.log('driver Location updated');
        }
      );
    }

     }).catch((error) => {
       console.log('Error getting location', error);
     });


  }
  updateDriverStatus(status) {
    if (this.driverDTO.id) {
      this.driverDTO.status = status;
      this.commandResource.updateDriverUsingPUT(this.driverDTO).subscribe(data => {
        console.log('Status Updated ' + data);
        this.online = data.status;
      });
    }
  }
}
