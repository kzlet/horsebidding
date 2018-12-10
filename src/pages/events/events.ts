import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  
  galleryType = 'regular';
  posts: { 'image': string; 'title': string; 'description': string; 'location': string; 'event_time': string; 'event_date': string; }[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.posts = [
      {'image':'imgs/Kingman1.jpg', 'title' : 'Isle of November', 'description':'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet' , 'location':'Central Avenue', 'event_time' : '14:00', 'event_date' :'12th December 2018' },
      {'image':'imgs/Kingman2.jpg', 'title' : 'Annual Race', 'description':'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet' , 'location':'Central Avenue', 'event_time' : '14:00', 'event_date' :'12th December 2018' },
      {'image':'imgs/Kingman3.jpg', 'title' : 'Ceaser Last Round', 'description':'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet' , 'location':'Central Avenue', 'event_time' : '14:00', 'event_date' :'12th December 2018' },
    ];
  }

}
