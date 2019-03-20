import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'Firebase';
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
  me_color: string;
  color_code: any;
  chatroom_id: string;

  constructor(public loadingCtrl: LoadingController, private http: Http, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {


    this.nativeStorage.getItem('color_code')
      .then(
        data => {
          this.color_code = data;
        },
        error => console.error(error)
      );

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
    this.get_chatrooms();
    this.get_admin_chatrooms();
  }



  viewchat(key, roomname: string) {
    console.log("Keys:" + key);
    console.log("nickname:" + this.nickname);
    console.log("UUId from chat groups:" + this.uuid)
    this.navCtrl.setRoot(AdminchatPage, {
      key: key,
      nickname: this.nickname,
      roomname: roomname,
    });
  }

  addRoom() {
    this.navCtrl.push(AddroomPage);
  }

  joinRoom(key, roomname: string, room_image: string, room_id: string) {
    console.log("Color code:" + this.color_code);
    console.log("Keys:" + key);
    console.log("nickname:" + this.nickname);
    this.apiUrl = 'http://racingroom.co.uk/mobile/mobile/check_for_subscription.php?user_id=' + this.user_id + '&chatroom_id=' + room_id;
    console.log(this.apiUrl);
    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        if (this.posts.Status === 'success') {
          this.navCtrl.setRoot(ChatPage, {
            key: key,
            nickname: this.nickname,
            roomname: roomname,
            room_image: room_image,
            room_id: room_id,
            me_color: this.color_code
          });
        }
        else {
          this.chatroom_id = room_id;
          this.apiUrl = 'http://racingroom.co.uk/mobile/mobile/apply_for_subscription.php?user_id=' + this.user_id + '&chatroom_id=' + this.chatroom_id;
          console.log(this.apiUrl);
          this.http.get(this.apiUrl).map(res => res.json())
            .subscribe(data => {
              this.posts = data;
              if (this.posts.Status === 'success') {
                this.navCtrl.setRoot(ChatPage, {
                  key: key,
                  nickname: this.nickname,
                  roomname: roomname,
                  room_image: room_image,
                  room_id: room_id,
                  me_color: this.color_code
                });
              }
              else {
                alert("Connection Error");
              }
            }, error => {
              console.log(error); // Error getting the data
            });
        }
      }, error => {
        console.log(error); // Error getting the data
      });
  }

  joinadminRoom(key, roomname: string, room_image: string, room_id: string) {
    console.log("Color code:" + this.color_code);
    console.log("Keys:" + key);
    console.log("nickname:" + this.nickname);
    this.apiUrl = 'http://racingroom.co.uk/mobile/mobile/check_for_subscription.php?user_id=' + this.user_id + '&chatroom_id=' + room_id;
    console.log(this.apiUrl);
    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        if (this.posts.Status === 'success') {
          this.navCtrl.setRoot(AdminchatPage, {
            key: key,
            nickname: this.nickname,
            roomname: roomname,
            room_image: room_image,
            room_id: room_id,
            me_color: this.color_code
          });
        }
        else {
          this.chatroom_id = room_id;
          this.apiUrl = 'http://racingroom.co.uk/mobile/mobile/apply_for_subscription.php?user_id=' + this.user_id + '&chatroom_id=' + this.chatroom_id;
          console.log(this.apiUrl);
          this.http.get(this.apiUrl).map(res => res.json())
            .subscribe(data => {
              this.posts = data;
              if (this.posts.Status === 'success') {
                this.navCtrl.setRoot(AdminchatPage, {
                  key: key,
                  nickname: this.nickname,
                  roomname: roomname,
                  room_image: room_image,
                  room_id: room_id,
                  me_color: this.color_code
                });
              }
              else {
                alert("Connection Error");
              }
            }, error => {
              console.log(error); // Error getting the data
            });
        }
      }, error => {
        console.log(error); // Error getting the data
      });
  }

  get_chatrooms() {
    this.apiUrl = 'http://racingroom.co.uk/mobile/mobile/get_chatrooms.php';

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        if (this.posts.status === 'failed') {
          alert("No Chat Rooms assigned to you yet !");
        }
        else {

        }
      }, error => {
        console.log(error); // Error getting the data
      });
  }

  get_admin_chatrooms() {
    this.apiUrl = 'http://racingroom.co.uk/mobile/mobile/get_admin_chatrooms.php';

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        this.toast = data;
        if (this.posts.status === 'failed') {
          alert("No Admin Chat Rooms available right now!");
        }
        else { }
      }, error => {
        console.log(error); // Error getting the data
      });
  }

  apply_subscription() {
    console.log(this.user_id);
    console.log(this.chatroom_id);
    this.apiUrl = 'http://racingroom.co.uk/mobile/mobile/apply_for_subscription.php?user_id=' + this.user_id + '&chatroom_id=' + this.chatroom_id;
    console.log(this.apiUrl);
    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        if (this.posts.Status === 'success') {

        }
        else {

        }
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