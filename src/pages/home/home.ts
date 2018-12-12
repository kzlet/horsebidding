import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ChatGroupsPage } from '../chat-groups/chat-groups';
import { EventsPage } from '../events/events';
import { FaqPage } from '../faq/faq';
import { BookieOfferPage } from '../bookie-offer/bookie-offer';
import { SettingsPage } from '../settings/settings';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selected = "";
  user = {
    name: 'Horse Tip App',
    twitter: '@admin',
    profileImage: '../assets/img/avatar/cosima-avatar.jpg',
    followers: 456,
    following: 1052,
    tweets: 35
  };
  posts: { 'image': string; 'name': string; 'id': string; }[];


  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    this.posts = [
      { 'image': 'imgs/icon1.png', 'name': 'Chat Groups', 'id': '1' },
      { 'image': 'imgs/icon2.png', 'name': 'Events', 'id': '2' },
      { 'image': 'imgs/icon3.png', 'name': 'FAQ', 'id': '3' },
      { 'image': 'imgs/icon4.png', 'name': 'Contact Us', 'id': '4' },
      { 'image': 'imgs/icon3.png', 'name': 'Bookie Offer', 'id': '5' },
      { 'image': 'imgs/icon4.png', 'name': 'Settings', 'id': '6' },
    ]
  }

  OnOpenMenu() {
    this.menuCtrl.open();
  }

  addEvent(index: string, id: string) {
    this.selected = index;
    console.log("Id:" + id);

    if (id === '1') {
      this.navCtrl.setRoot(ChatGroupsPage);
    }
    else if (id === '2') {
      this.navCtrl.setRoot(EventsPage);
    }
    else if (id === '3') {
      this.navCtrl.setRoot(FaqPage);
    }
    else if (id === '4') {
      this.navCtrl.setRoot(ContactPage);
    }
    else if (id === '5') {
      this.navCtrl.setRoot(BookieOfferPage);
    }
    else if (id === '6') {
      this.navCtrl.setRoot(SettingsPage);
    }

  }

}
