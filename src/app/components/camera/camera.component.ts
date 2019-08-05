import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  constructor(private camera: Camera,
              private modalController: ModalController) { }

image: string = 'none';

  ngOnInit() {
    this.click();
  }


  click() {
    this.image='none';
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {

     const base64Image = 'data:image/jpeg;base64,' + imageData;
     console.log('licence image clicked');
     this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      image: this.image
    });
  }


}
