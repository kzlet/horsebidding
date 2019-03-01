import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-bookie-offer',
  templateUrl: 'bookie-offer.html',
})
export class BookieOfferPage {
  apiUrl: string;
  posts: any;
  constructor(private iab: InAppBrowser, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
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

    this.apiUrl = 'http://racingroom.co.uk/mobile/mobile/get_offers.php';

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        if (this.posts === undefined || this.posts === 'undefined') {
          alert("No Offers to Show");
          loader.dismiss();
        }
        else
          loader.dismiss();

      }, error => {
        console.log(error); // Error getting the data

      });
  }

  view_offer(hyperlink:string)
  {
    console.log("Link clicked");
    var text = 'https://';
    const browser = this.iab.create(text + hyperlink, '_blank', 'location=no');
  }

}
