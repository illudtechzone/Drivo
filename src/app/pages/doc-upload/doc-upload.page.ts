import { CameraComponent } from './../../components/camera/camera.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.page.html',
  styleUrls: ['./doc-upload.page.scss'],
})
export class DocUploadPage implements OnInit {


  constructor(private modalController: ModalController) { }

imageLicence = '';
 imageRcBook = '';
imageAadhaar = '';
  ngOnInit(): void {

  }

  async presentModal(docName: string) {
    const modal = await this.modalController.create({
      component: CameraComponent,
      });
    modal.onDidDismiss()
      .then((data) => {
        if (docName == 'licence') {
        console.log('>>>>>>licence ', data);
        this.imageLicence = data.data();
        } else if (docName == 'rc') {

          this.imageRcBook = data.data();
          console.log('>>>>>> rc', data);
          } else if (docName == 'aadhaar') {

            console.log('>>>>>> adhaar', data);
            this.imageAadhaar = data.data();
            }
    });

    return await modal.present();
  }

}
