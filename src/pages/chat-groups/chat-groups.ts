import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase  from 'Firebase';
import { ChatPage } from '../chat/chat';
import { NativeStorage } from '@ionic-native/native-storage';
import { AddroomPage } from '../addroom/addroom';
import { AdminchatPage } from '../adminchat/adminchat';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-chat-groups',
  templateUrl: 'chat-groups.html',
})
export class ChatGroupsPage {
  rooms = [];
  
  ref = firebase.database().ref('chatrooms/');
  ref2 = firebase.database().ref('adminRooms/');
  nickname: any;
  adminRooms: any[];
  uuid: any;
  user_id: any;
  posts: any;
  apiUrl: string;
  toast: any;

  constructor(public loadingCtrl: LoadingController ,private http: Http, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {
 
    this.nativeStorage.getItem('nickname')
      .then(
        data => {
          this.nickname = data;
        },
        error => console.error(error)
      );

      this.nativeStorage.getItem('user_id')
      .then(
        data => {
          this.user_id = data;
          this.get_chatrooms();
          this.get_admin_chatrooms();
        },
        error => console.error(error)
      );

    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      console.log(this.rooms.length);
    });

    this.ref2.on('value', resp => {
      this.adminRooms = [];
      this.adminRooms = snapshotToArray(resp);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatGroupsPage');
  }

  viewchat(key, roomname : string) {
    console.log("Keys:" + key);
    console.log("nickname:" + this.nickname);
    console.log("UUId from chat groups:" + this.uuid)
    this.navCtrl.setRoot(AdminchatPage, {
      key:key,
      nickname:  this.nickname,
      roomname : roomname,
    });
  }

  addRoom() {
    this.navCtrl.push(AddroomPage);
  }

  joinRoom(key, roomname : string, room_image : string, room_id :string) {
    console.log("Keys:" + key);
    console.log("nickname:" + this.nickname);
    this.navCtrl.setRoot(ChatPage, {
      key:key,
      nickname:  this.nickname,
      roomname : roomname,
      room_image: room_image,
      room_id : room_id
    });
  }

  joinadminRoom(key, roomname : string, room_image : string, room_id :string) {
    console.log("Keys:" + key);
    console.log("nickname:" + this.nickname);
    this.navCtrl.setRoot(AdminchatPage, {
      key:key,
      nickname:  this.nickname,
      roomname : roomname,
      room_image: room_image,
      room_id : room_id
    });
  }

  get_chatrooms()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Chat Rooms..."
    });
    loader.present();
    this.apiUrl = 'https://purpledimes.com/James-Horse/mobile/get_chatrooms.php?id=' + this.user_id;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        if (this.posts === undefined || this.posts === 'undefined') {
          alert("No Chat Rooms assigned to you yet !");
          loader.dismiss();
        }
        else
          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data
      });
  }

get_admin_chatrooms()
{
  let loader = this.loadingCtrl.create({
    content: "Loading Chat Rooms..."
  });
  loader.present();
  this.apiUrl = 'https://purpledimes.com/James-Horse/mobile/get_admin_chatrooms.php?id=' + this.user_id;

  console.log(this.apiUrl);

  this.http.get(this.apiUrl).map(res => res.json())
    .subscribe(data => {
      this.toast = data;
      if (this.toast === undefined || this.toast === 'undefined') {
        alert("No Admin Chat Rooms available right now!");
        loader.dismiss();
      }
      else
        loader.dismiss();
    }, error => {
      console.log(error); // Error getting the data
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