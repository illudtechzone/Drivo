import { RiderLocationInfo } from './../../api/models/rider-location-info';
import { RiderDTO } from './../../api/models/rider-dto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private riderDto : RiderDTO={};
  private riderLocationInfo:RiderLocationInfo={};
  constructor() { }
  setRiderLocationInfo(riderLocation :RiderLocationInfo){
    this.riderLocationInfo = riderLocation;
  }
  getRiderLocationInfo():RiderLocationInfo{
    return this.riderLocationInfo;
  }
}
