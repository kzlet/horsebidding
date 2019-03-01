import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  
  galleryType = 'regular';
  apiUrl: string;
  posts: any;
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
  this.get_data();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  get_data()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'http://racingroom.co.uk/mobile/mobile/get_events.php';

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        if (this.posts === undefined || this.posts === 'undefined') {
          alert("No Events to View");
          loader.dismiss();
        }
        else
          loader.dismiss();

      }, error => {
        console.log(error); // Error getting the data

      });
  }

}
