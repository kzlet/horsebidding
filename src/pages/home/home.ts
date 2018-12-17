import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ChatGroupsPage } from '../chat-groups/chat-groups';
import { EventsPage } from '../events/events';
import { FaqPage } from '../faq/faq';
import { BookieOfferPage } from '../bookie-offer/bookie-offer';
import { SettingsPage } from '../settings/settings';
import { ContactPage } from '../contact/contact';
import * as firebase from 'Firebase';
import { NativeStorage } from '@ionic-native/native-storage';

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

  uuid : any = '4SHrPtfbMATuc2jk5MSOHVkqKFJ2';
  
  ref = firebase.database().ref(`profile/${this.uuid}`);
  username: any[];
 

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public menuCtrl: MenuController) {
    this.posts = [
      { 'image': 'imgs/icon1.png', 'name': 'Chat Groups', 'id': '1' },
      { 'image': 'imgs/icon2.png', 'name': 'Events', 'id': '2' },
      { 'image': 'imgs/icon3.png', 'name': 'FAQ', 'id': '3' },
      { 'image': 'imgs/icon4.png', 'name': 'Contact Us', 'id': '4' },
      { 'image': 'imgs/icon3.png', 'name': 'Bookie Offer', 'id': '5' },
      { 'image': 'imgs/icon4.png', 'name': 'Settings', 'id': '6' },
    ]

    this.nativeStorage.getItem('uuid')
    .then(
      data => {
        this.uuid = data;
      },
      error => console.error(error)
    );

    this.ref.on('value', resp => {
      this.username = [];
      this.username = snapshotToArray(resp);
      console.log("data:" + JSON.stringify(this.username));
      
        this.nativeStorage.setItem('nickname', this.username[0])
        .then(
          data => console.log('User Name Stored!' + data),
          error => console.error('Error storing item', error)
        );

    });

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
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
     // item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};