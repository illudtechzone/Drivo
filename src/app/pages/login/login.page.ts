import { CurrentUserService } from './../../services/current-user.service';
import { DriverDTO } from './../../api/models/driver-dto';
import { UtilService } from './../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'src/app/services/security/keycloak.service';
import { CommandResourceService } from 'src/app/api/services/command-resource.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  username: string;
  password: string;
  constructor(private oauthService: OAuthService,
              private navCtrl: NavController,
              private toastController: ToastController,
              private util: UtilService,
              private keycloakService: KeycloakService,
              private commandResource: CommandResourceService,
              private currentUserService: CurrentUserService) { }

  ngOnInit() {
    if (this.oauthService.hasValidAccessToken()) {
      this.navCtrl.navigateRoot('/home');
    }
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      cssClass: 'toast'
    });
    toast.present();
  }
  login() {
    this.util.createLoader()
      .then(loader => {
        loader.present();
        this.keycloakService.authenticate({ username: this.username, password: this.password },
          () => {
            loader.dismiss();
            console.log('slsklkslkks');
            // this.createDriverIfNotExist();
            this.navCtrl.navigateForward('/home');
          },
          () => {
            loader.dismiss();
            this.util.createToast('Invalid Username or Password');
          });
      });
  }
  createDriverIfNotExist() {
   const driverDto: DriverDTO = {};
   this.currentUserService.getCurrentUser(true).then(result => {
    console.log('current user', result);
    driverDto.firstName = result.preferred_username;
    driverDto.id = result.sub;
    console.log('driverDto', driverDto);
  //   this.commandResource.createDriverIfNotExistUsingPOST({}).subscribe(
  //    result2 => {
  //      console.log('sucess creating user', result2);
  //      this.navCtrl.navigateForward('/home');

  //    },
  //    err => {
  //      console.log('error creating user', err);
  //    }
  //  );
 },
  err => {

  });

  }

}
