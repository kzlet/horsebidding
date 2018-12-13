import { Component, ViewChild } from '@angular/core';
import { NavParams,  AlertController, App, LoadingController, NavController, Slides, } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email : any;
  password : any;

  public loginForm: any;
  public backgroundImage = 'assets/imgs/bg.png'
  nickname: any;
  conpassword: any;

  constructor(private nativeStorage: NativeStorage, private fire : AngularFireAuth , public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public app: App) {
  }

  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


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
    this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(data => {
      console.log("Done"+ JSON.stringify(data));

      console.log("User ID" + JSON.stringify(data.user.uid));
  
      //  this.nativeStorage.setItem('nickname', this.nickname)
      //   .then(
      //     () => console.log('User Name Stored!'),
      //     error => console.error('Error storing item', error)
      //   );

        this.nativeStorage.setItem('uuid', data.user.uid)
        .then(
          () => console.log('UUID Stored!'),
          error => console.error('Error storing item', error)
        );
  
      const alert = this.alertCtrl.create({
        title: 'Welcome to the App',
        buttons: ['OK']
      });
      alert.present();
     // this.navCtrl.setRoot(HomePage);
    })
    .catch((error: any) =>{
      console.error(error);
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: error,
        buttons: ['OK']
      });
      alert.present();
    }
      );
    
  }

  signup() {

    if( this.password === this.conpassword)
    {
      this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(data => {
        console.log("Done"+ data);
    
        this.nativeStorage.setItem('nickname', this.nickname)
        .then(
          () => console.log('User Name Stored!'),
          error => console.error('Error storing item', error)
        );
    
        const alert = this.alertCtrl.create({
          title: 'Welcome to the App',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error: any) => console.error(error));
    }
else{
  const alert = this.alertCtrl.create({
    title: 'Passwords do not match',
    buttons: ['OK']
  });
  alert.present();
}
   
  }


  resetPassword() {
    this.presentLoading('An e-mail was sent with your new password.');
  }
}
