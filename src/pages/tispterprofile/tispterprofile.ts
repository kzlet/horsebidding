import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-tispterprofile',
  templateUrl: 'tispterprofile.html',
})
export class TispterprofilePage {
  imageUrl: string = 'imgs/Kingman1.jpg';
  apiUrl: string;
  posts: any;
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
  this.get_data();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TispterprofilePage');
  }

  get_data()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'http://racingroom.co.uk/mobile/mobile/get_profiles.php';

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        if (this.posts === undefined || this.posts === 'undefined') {
          alert("No Profiles to Show");
          loader.dismiss();
        }
        else
          loader.dismiss();

      }, error => {
        console.log(error); // Error getting the data

      });
  }

}
