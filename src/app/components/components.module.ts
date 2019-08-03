import { RideRequestComponent } from './ride-request/ride-request.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { CameraComponent } from './camera/camera.component';



@NgModule({
  declarations: [CameraComponent,RideRequestComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  exports:[CameraComponent,RideRequestComponent]
})
export class ComponentsModule { }
