import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { EditprofilePage } from '../editprofile/editprofile';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public alertCtrl : AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logout()
  {
    const confirm = this.alertCtrl.create({
      title: 'Do You want to Logout ?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Agree clicked');
            this.navCtrl.setRoot(RegisterPage);
          }
        }
      ]
    });
    confirm.present();
  }

  edit()
  {
    this.navCtrl.push(EditprofilePage);
  }

}
