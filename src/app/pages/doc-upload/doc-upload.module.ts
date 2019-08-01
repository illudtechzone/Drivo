import { ComponentsModule } from './../../components/components.module';
import { CameraComponent } from './../../components/camera/camera.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DocUploadPage } from './doc-upload.page';

const routes: Routes = [
  {
    path: '',
    component: DocUploadPage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DocUploadPage],
  entryComponents: [CameraComponent]
})
export class DocUploadPageModule {}
