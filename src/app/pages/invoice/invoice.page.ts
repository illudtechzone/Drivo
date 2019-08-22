import { CustomerService } from './../../services/customerService/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  travelInfo:any={}

  constructor(private customerService:CustomerService) {

   }

  ngOnInit() {

    this.travelInfo=this.customerService.getRiderLocationInfo();

  }

}
