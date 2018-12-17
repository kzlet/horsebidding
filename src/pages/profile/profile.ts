import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from '@angular/fire/database';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile = {} as Profile;

  constructor(public alertCtrl: AlertController, private afDatabase : AngularFireDatabase, private nativeStorage: NativeStorage, private fire : AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  updateProfile(){
    this.fire.authState.take(1).subscribe( auth => {
       this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
       .then(() => {

        const alert = this.alertCtrl.create({
          title: 'Login to Continue',
          buttons: ['OK']
        });
        alert.present();

        
        this.navCtrl.setRoot(RegisterPage);
       
       
    });

    })
  }
}
