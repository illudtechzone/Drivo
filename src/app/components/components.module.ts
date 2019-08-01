import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { CameraComponent } from './camera/camera.component';



@NgModule({
  declarations: [CameraComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  exports:[CameraComponent]
})
export class ComponentsModule { }
