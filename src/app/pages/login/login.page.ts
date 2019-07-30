import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  username: String = '';
  password: String = '';


  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }
  tryLogin() {

this.navCtrl.navigateForward("/home");

  }


}