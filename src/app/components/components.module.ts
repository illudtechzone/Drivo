import { RideRequestComponent } from './ride-request/ride-request.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CameraComponent } from './camera/camera.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CameraComponent,RideRequestComponent],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule.forRoot(),
  ],
  exports:[CameraComponent,RideRequestComponent]
})
export class ComponentsModule { }
