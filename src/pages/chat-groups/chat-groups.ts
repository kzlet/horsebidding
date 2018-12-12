import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { ChatPage } from '../chat/chat';
import { NativeStorage } from '@ionic-native/native-storage';
import { AddroomPage } from '../addroom/addroom';

@Component({
  selector: 'page-chat-groups',
  templateUrl: 'chat-groups.html',
})
export class ChatGroupsPage {
  chats: { imageUrl: string; title: string; lastMessage: string; timestamp: Date; }[];
  rooms = [];
  
  ref = firebase.database().ref('chatrooms/');
  nickname: any = 'kumail';

  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {

    this.nativeStorage.getItem('nickname')
      .then(
        data => {
          this.nickname = data;
        },
        error => console.error(error)
      );


    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      console.log("Rooms:" + JSON.stringify(resp));
      //console.log("Rooms: " + JSON.stringify(this.rooms[0].chats.user));
    });
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

  addRoom() {
    this.navCtrl.push(AddroomPage);
  }

  joinRoom(key, roomname : string) {
    console.log("Keys:" + key);
    console.log("nickname:" + this.nickname);
    this.navCtrl.setRoot(ChatPage, {
      key:key,
      nickname:  this.nickname,
      roomname : roomname
    });
  }

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};