import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { BookieOfferPage } from '../pages/bookie-offer/bookie-offer';
import { ChatGroupsPage } from '../pages/chat-groups/chat-groups';
import { ContactPage } from '../pages/contact/contact';
import { EventsPage } from '../pages/events/events';
import { FaqPage } from '../pages/faq/faq';
import { SettingsPage } from '../pages/settings/settings';
import { PaypalPage } from '../pages/paypal/paypal';
//for Push notifications
import { OneSignal } from '@ionic-native/onesignal';
import { NativeStorage } from '@ionic-native/native-storage';
import { Badge } from '@ionic-native/badge';
import { TispterprofilePage } from '../pages/tispterprofile/tispterprofile';

import * as firebase from 'firebase/app';
import { MemberCriPage } from '../pages/member-cri/member-cri';
// Initialize Firebase  kumail-horse (Firebase project name)
var config = {
    apiKey: "AIzaSyAZL1xXcN70IBu4AoiNVrskAJY7oS-qdds",
    authDomain: "racing-room.firebaseapp.com",
    databaseURL: "https://racing-room.firebaseio.com",
    projectId: "racing-room",
    storageBucket: "racing-room.appspot.com",
    messagingSenderId: "142157616188"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  rootPage:any = RegisterPage; //HomePage RegisterPage
  
  home = HomePage;
  bookie = BookieOfferPage;
  chatgroup = ChatGroupsPage;
  contact = ContactPage;
  event = EventsPage; 
  faq = FaqPage;
  tips = TispterprofilePage;
  member = MemberCriPage;
  
  constructor(private badge: Badge, public alertCtrl : AlertController, public nativeStorage : NativeStorage, private oneSignal: OneSignal, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
 //     enableProdMode();
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
    this.get_onesignal();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  } 

  OnLoad(page: any)
  {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  close()
  {
    this.menuCtrl.close();
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
            this.nav.setRoot(RegisterPage);
            this.menuCtrl.close();
          }
        }
      ]
    });
    confirm.present();  
  }

  settings()
  {
    this.nav.setRoot(SettingsPage);
    this.menuCtrl.close();
  }

  get_onesignal()
  {
     //OneSignal ID 
     this.oneSignal.startInit('f1f10d1f-7893-4016-9449-0ee9ebc2fc58','896600085936');
     this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
     this.oneSignal.handleNotificationReceived().subscribe(() => {
     
     });
     
     this.oneSignal.handleNotificationOpened().subscribe(() => {
      this.badge.clear();
     });
     this.oneSignal.endInit();

     this.oneSignal.getIds().then(identity => {
      console.log(identity.userId + 'its USERID');
  
     // this.uuid_code = identity.userId;
  
      this.nativeStorage.setItem('playerid', identity.userId)
        .then(
          () => console.log('playerid Stored!'),
          error => console.error('Error storing item', error)
        );
    });
  }
}

