import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-chatsettings',
  templateUrl: 'chatsettings.html',
})
export class ChatsettingsPage {
  roomname: any;
  room_image: any;
  user_id: any;
  apiUrl: string;
  posts: any;
  room_id: any;
  status: any;
  value: string;
  chat_status: Boolean;

  constructor(private http: Http, public loadingCtrl : LoadingController ,public nativeStorage : NativeStorage ,private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.roomname = this.navParams.get('roomname');
    this.room_image = this.navParams.get('room_image'); 
    this.room_id = this.navParams.get('room_id');

    this.nativeStorage.getItem('user_id')
    .then(
      data => {
        console.log("Checking for user_id:" + data);
        this.user_id = data;
        this.get_chat_data();
      },
      error => console.error(error)
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsettingsPage');
  }

  close() {
    this.view.dismiss();
  }

  get_chat_data()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Profile..."
    });
    loader.present();
    this.apiUrl = 'https://purpledimes.com/James-Horse/mobile/get_push_notification_status.php?id=' + this.user_id + '&chatroom_id=' + this.room_id ;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        console.log(this.posts[0]);
        this.status = this.posts[0].notification_status;
        console.log("Status" + this.status);

        if(this.status === '1')
        {
          this.chat_status = true;
        }

        else if(this.status === '0')
        {
          this.chat_status = false;
        }

        
          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data
      });
  
  }

  update()
  {
    console.log("Check Status:" + this.chat_status);

    if(this.chat_status === true)
    {
      this.value = '1';
      let loader = this.loadingCtrl.create({
        content: "Updating Status..."
      });
      loader.present();
      this.apiUrl = 'https://purpledimes.com/James-Horse/mobile/update_notification_status.php?user_id=' + this.user_id + '&chatroom_id=' + this.room_id + '&notification_status=' + this.value;
    
      console.log(this.apiUrl);
  
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
          this.posts = data;
  
          if (this.posts.Status === 'success')
          {
            alert("Status Updated Successfully");
            this.view.dismiss();
          }
          else
          if (this.posts.Status === 'failed')
          {
            alert("Status Updated Un-Successfully");
          }
          
            loader.dismiss();
        }, error => {
          console.log(error); // Error getting the data
        });
    }
    else if(this.chat_status === false)
    {
      this.value = '0';
      let loader = this.loadingCtrl.create({
        content: "Updating Status..."
      });
      loader.present();
      this.apiUrl = 'https://purpledimes.com/James-Horse/mobile/update_notification_status.php?user_id=' + this.user_id + '&chatroom_id=' + this.room_id + '&notification_status=' + this.value;
    
      console.log(this.apiUrl);
  
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
          this.posts = data;
  
          if (this.posts.Status === 'success')
          {
            alert("Status Updated Successfully");
            this.view.dismiss();
          }
          else
          if (this.posts.Status === 'failed')
          {
            alert("Status Updated Un-Successfully");
          }
          
            loader.dismiss();
        }, error => {
          console.log(error); // Error getting the data
        });
    }
    
  }
}
