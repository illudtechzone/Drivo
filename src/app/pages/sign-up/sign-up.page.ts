import { DirectionsService } from './../../services/directions.service';
import { CommandResourceService } from 'src/app/api/services';
import { KeycloakService } from './../../services/security/keycloak.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakAdminClient } from 'keycloak-admin/lib/client';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

 firstName: string;
  username: string;
  password: string;
  email: string;
  phone: number;
  lastName = '';

  ngOnInit(): void {

  }

  constructor(private navCtrl: NavController, private util: UtilService,
              private keycloakService: KeycloakService,
              private commandResourceService: CommandResourceService,
              private diractionService: DirectionsService) {

  }
  signup() {
    console.log('emailll>>>>>>', this.email);
    if(this.validatePhone() && this.validateEmail()){
    this.util.createLoader()
      .then(loader => {
        loader.present();
        const user = { username: this.username, email: this.email };
        this.keycloakService.createAccount(user, this.password,
          (res) => {
            console.log('keycloak user ', res);
            this.createDriver();
            loader.dismiss();
          },
          (err) => {
            loader.dismiss();
            if (err.response.status === 409) {
              this.util.createToast('User Already Exists');
            } else {
              this.util.createToast('Cannot Register User. Please Try Later');
            }
          });

        });
      }
  }

  createDriver() {


    this.keycloakService.authenticate({ username: this.username, password: this.password },
      () => {

          this.commandResourceService.createDriverIfNotExistUsingPOST({idpcode: this.username,
            firstName: this.firstName,
            lastName: this.lastName,

          }).subscribe(res => {
           console.log('created user in microservice ', res);
           this.keycloakService.logout();
           this.navCtrl.navigateForward('/login');
         },
         err => {
           console.log('created user in microservice ', err);
         });
        // });
      },
      () => {
        this.util.createToast('an error occured');
      });

  }
  validateEmail() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(this.email).toLowerCase())) {
      this.util.createToast('Invalid email ');
      return false;
    }
    return true;
  }

  validatePhone() {
    const re = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    if (!re.test(String(this.phone).toLowerCase())) {
      this.util.createToast('Invalid Phone number ');
      return false;
    }
    return true;
  }
}
