import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
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

import * as firebase from 'firebase';
import { PaypalPage } from '../pages/paypal/paypal';

//for Push notifications
import { OneSignal } from '@ionic-native/onesignal';
import { NativeStorage } from '@ionic-native/native-storage';

// Initialize Firebase  kumail-horse (Firebase project name)
var config = {
  apiKey: "AIzaSyBu6m7gEDyIHPLEFaIw87Nkikf9t8F9H_U",
    authDomain: "kumail-horse.firebaseapp.com",
    databaseURL: "https://kumail-horse.firebaseio.com",
    projectId: "kumail-horse",
    storageBucket: "gs://kumail-horse.appspot.com/",
    messagingSenderId: "896600085936"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  rootPage:any = HomePage; //HomePage RegisterPage
  
  home = HomePage;
  bookie = BookieOfferPage;
  chatgroup = ChatGroupsPage;
  contact = ContactPage;
  event = EventsPage; 
  faq = FaqPage;
  
  constructor(public nativeStorage : NativeStorage, private oneSignal: OneSignal, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
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
    this.nav.setRoot(RegisterPage);
    this.menuCtrl.close();
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
     this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
     this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
     });
     this.oneSignal.handleNotificationOpened().subscribe(() => {
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

