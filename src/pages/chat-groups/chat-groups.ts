import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-chat-groups',
  templateUrl: 'chat-groups.html',
})
export class ChatGroupsPage {
  chats: { imageUrl: string; title: string; lastMessage: string; timestamp: Date; }[];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatGroupsPage');
    this.chats = [{
      imageUrl: 'imgs/cht.png',
      title: 'Bid Station 101',
      lastMessage: 'Hey, what happened yesterday?',
      timestamp: new Date()
    },
    {
      imageUrl: 'imgs/cht.png',
      title: 'New Subscribers',
      lastMessage: 'Sup, dude',
      timestamp: new Date()
    }
    ,
    {
      imageUrl: 'imgs/cht.png',
      title: 'General Information',
      lastMessage: 'You still ow me that pizza.',
      timestamp: new Date()
    }];
  }

}
