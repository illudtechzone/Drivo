
import { RiderDTO } from './../../api/models/rider-dto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private riderDto : RiderDTO={};
  private riderLocationInfo:any={};

  private invoice:any={};
  constructor() { }
  setRiderLocationInfo(riderLocation :any){
    this.riderLocationInfo = riderLocation;
  }
  getRiderLocationInfo():any{
    return this.riderLocationInfo;
  }

  setInvoice(invoice :any){

    this.invoice=invoice;

  }

  getInvoice()
  {
    
  }
}
