import { CameraComponent } from './../../components/camera/camera.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.page.html',
  styleUrls: ['./doc-upload.page.scss'],
})
export class DocUploadPage implements OnInit {


  constructor( private modalController: ModalController) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: CameraComponent
    });
    return await modal.present();
  }

}
