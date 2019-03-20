import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage { 
  constructor(private nativeStorage: NativeStorage, private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaypalPage');
  }

  close() {
    this.view.dismiss();
  }

  agree()
  {
    this.navCtrl.setRoot(HomePage);
  }

 
}
