import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, MenuController } from 'ionic-angular';
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
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  rootPage:any = HomePage;
  
  home = HomePage;
  bookie = BookieOfferPage;
  chatgroup = ChatGroupsPage;
  contact = ContactPage;
  event = EventsPage; 
  faq = FaqPage;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
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
}

