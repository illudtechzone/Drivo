import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  username: String = '';
  password: String = '';
  email: String = '';
  firstName: String = '';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  signup() {
  this.navCtrl.navigateForward('/home');
  }

}
