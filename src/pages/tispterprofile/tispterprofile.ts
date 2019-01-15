import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tispterprofile',
  templateUrl: 'tispterprofile.html',
})
export class TispterprofilePage {
  posts = [];
  imageUrl: string = 'imgs/Kingman1.jpg';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (let i = 0; i < 10; i++) {
      this.posts[i] = {
        text: 'Post text ' + i,
        created_at: (i + 1),
      };
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TispterprofilePage');
  }

}
