import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-chatsettings',
  templateUrl: 'chatsettings.html',
})
export class ChatsettingsPage {
  roomname: any;
  room_image: any;

  constructor(private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.roomname = this.navParams.get('roomname');
    this.room_image = this.navParams.get('room_image');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsettingsPage');
  }

  close() {
    this.view.dismiss();
  }

}
