import { Component } from '@angular/core';

import { Platform, ToastController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JwksValidationHandler, OAuthService, AuthConfig } from 'angular-oauth2-oidc';

import { JhiWebSocketService } from './services/jhi-web-socket.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    },

    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Rider',
      url: '/list',
      icon: 'contact'
    },
    {
      title: 'Logout',
      url: '/',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oauthService: OAuthService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private websocketService: JhiWebSocketService,
    public backgroundMode: BackgroundMode
  ) {
    this.initializeApp();
  }
  logout() {
    console.log('Logout clicked');
    this.websocketService.disconnect();
    if (this.websocketService.stompClient && this.websocketService.stompClient.connected) {
      this.websocketService.disconnect();
  }
    this.oauthService.logOut();
    this.presentToastLogout();
    this.navCtrl.navigateRoot('/login');
  }
    async presentToastLogout() {
    const toast = await this.toastController.create({
      message: 'You\'ve been successfully logout',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast'
    });
    toast.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backgroundMode.enable();
    });
  }
}
