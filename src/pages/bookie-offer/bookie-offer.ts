import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-bookie-offer',
  templateUrl: 'bookie-offer.html',
})
export class BookieOfferPage {
  posts: { 'image': string; 'title': string; }[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.posts=[
      {'image':'imgs/Kingman1.jpg', 'title':'Bookie Offer 1'},
      {'image':'imgs/Kingman2.jpg', 'title':'Bookie Offer 2'},
      {'image':'imgs/Kingman3.jpg', 'title':'Bookie Offer 3'},
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookieOfferPage');
  }

}
