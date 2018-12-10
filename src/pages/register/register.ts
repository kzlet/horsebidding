import { Component, ViewChild } from '@angular/core';
import { NavParams,  AlertController, App, LoadingController, NavController, Slides, } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email : any;
  password : any;

  public loginForm: any;
  public backgroundImage = 'assets/imgs/bg.png'

  constructor(private fire : AngularFireAuth , public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public app: App) {
  }

  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // signup()
  // {

  // console.log("Email" + this.email);
  // console.log("Password" + this.password);
  // this.fire.auth.createUserWithEmailAndPassword(this.email , this.password)
  // .then(data => {
  //  console.log("Response:" + JSON.stringify(data));
  // })
  // .catch(error => {
  // console.log("Error" + error);
  // });
  // }


  go()
  {
    this.navCtrl.push(HomePage);
  }

  //signin-signup methods from theme
  goToLogin() {
    this.slider.slideTo(1);
  }

  goToSignup() {
    this.slider.slideTo(2);
  }

  slideNext() {
    this.innerSlider.slideNext();
  }

  slidePrevious() {
    this.innerSlider.slidePrev();
  }

  presentLoading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }

  login() {
    this.presentLoading('Thanks for signing up!');
     this.navCtrl.setRoot(HomePage);
  }

  signup() {
    this.presentLoading('Thanks for signing up!');
     this.navCtrl.setRoot(HomePage);
  }
  resetPassword() {
    this.presentLoading('An e-mail was sent with your new password.');
  }
}
