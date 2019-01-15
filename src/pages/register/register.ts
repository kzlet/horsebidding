import { Component, ViewChild } from '@angular/core';
import { NavParams, AlertController, App, LoadingController, NavController, Slides, } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProfilePage } from '../profile/profile';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Profile } from '../../models/profile';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  profileData: AngularFireObject<Profile>

  email: any;
  password: any;

  public loginForm: any;
  public backgroundImage = 'assets/imgs/bg.png'
  nickname: any;
  conpassword: any;
  value: any = '1';
  name: any;
  apiUrl: string;
  playerid: any;
  fire_uuid: any;
  change_email: string;
  post_code: string;
  phone_number: string;
  mydate: string;

  constructor(private http: Http, private afDatabase: AngularFireDatabase, private nativeStorage: NativeStorage, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public app: App) {
    this.nativeStorage.getItem('playerid')
    .then(
      data => {
        console.log("Checking for playerid:" + data);
        this.playerid = data;
      },
      error => console.error(error)
    );
  }

  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  reset_pass()
  {
    this.fire.auth.sendPasswordResetEmail(this.change_email)
      .then(() =>{ 
        alert("Email Sent Successfully!");
        this.value = '1';
    })
      .catch((error) => console.log(error))
  }

  go() {
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

  firebase_login() {
    this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(data => {
        console.log("Done" + JSON.stringify(data));

        console.log("User ID" + JSON.stringify(data.user.uid));

        this.nativeStorage.setItem('uuid', data.user.uid)
          .then(
            () => console.log('UUID Stored!'),
            error => console.error('Error storing item', error)
          );
        this.login();
      })
      .catch((error: any) => {
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


  login() {
    this.apiUrl = 'https://purpledimes.com/James-Horse/mobile/user_login.php?email=' + this.email;
    console.log(this.apiUrl)

    if (this.email === undefined) {
      let alert = this.alertCtrl.create({
        title: 'Sign-in Error',
        subTitle: 'Email and Password Required',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    let loader = this.loadingCtrl.create({
      content: "Signing In..."
    });
    loader.present();

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        console.log(data);
        loader.dismissAll();

        var str = data.Status;

        if (str === 'success') {

          this.nativeStorage.setItem('user_id', data.id)
          .then(
            () => console.log('User id Stored!'),
            error => console.error('Error storing item', error)
          );

          this.nativeStorage.setItem('email', data.email)
            .then(
              () => console.log('User Email Stored!'),
              error => console.error('Error storing item', error)
            );

          this.nativeStorage.setItem('nickname', data.name)
            .then(
              () => console.log('name Stored!'),
              error => console.error('Error storing item', error)
            );

          this.nativeStorage.setItem('pay_status', data.pay_status)
            .then(
              () => console.log('name Stored!'),
              error => console.error('Error storing item', error)
            );

          if (data.fire_UID === '' || data.fire_UID === 'undefined' || data.fire_UID === undefined || data.fire_UID === 'Null' || data.fire_UID === null) {
        
            this.nativeStorage.getItem('uuid')
              .then(
                data => {
                  console.log("Checking for playerid:" + data);
                  this.fire_uuid = data;
                    console.log("UUID when fire_UID: " + this.fire_uuid);
                    this.apiUrl = 'https://purpledimes.com/James-Horse/mobile/register_uid.php?email=' + this.email + '&fire_UID=' + this.fire_uuid;
                    this.http.get(this.apiUrl).map(res => res.json())
                      .subscribe(data => {
                        loader.dismiss();
                        console.log("After data:" + data.fire_UID);
                        let alert = this.alertCtrl.create({
                          title: 'Login Successful',
                          subTitle: 'Welcome to Racing Room',
                          buttons: ['OK']
                        });
                        alert.present();
                        this.navCtrl.setRoot(HomePage);
                      }, error => {
                        console.log(error);// Error getting the data
                      });
                    
                },
                error => console.error(error)
              );

          } //checking for UUID
          else{
          let alert = this.alertCtrl.create({
            title: 'Login Successful',
            subTitle: 'Welcome to Racing Room',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot(HomePage);
        }

        } else if (str === 'failed') {
          let alert = this.alertCtrl.create({
            title: 'Authentication Failed',
            subTitle: 'Email or Password is Invalid',
            buttons: ['OK']
          });
          alert.present();
        }
      }, error => {
        console.log(error); // Error getting the data

        let alert = this.alertCtrl.create({
          title: 'Network Failed',
          subTitle: 'Please try again later',
          buttons: ['OK']

        });
        alert.present();
        loader.dismissAll();
      });

  }

  signup() {

    if (this.password === this.conpassword) {
      this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          console.log("Done" + data);

          if (this.name === undefined || this.email === undefined || this.password === undefined) {
            let alert = this.alertCtrl.create({
              title: 'All fields are required',
              buttons: ['OK']
            });
            alert.present();
          }

          else {

            let loader = this.loadingCtrl.create({
              content: "User Registeration in Progress..."
            });
            loader.present();

            this.nativeStorage.getItem('playerid')
            .then(
              data => {
                console.log("Checking for playerid:" + data);
                this.playerid = data;
            

            this.apiUrl = 'https://purpledimes.com/James-Horse/mobile/user_register.php?name=' + this.name + '&password=' + this.password + '&email=' + this.email + '&playerid=' + this.playerid + '&post_code=' + this.post_code + '&phone_number=' + this.phone_number + '&dob=' + this.mydate;

            this.http.get(this.apiUrl).map(res => res.json())
              .subscribe(data => {
                loader.dismiss();

                console.log(data);

                var status = data.Status;

                if (status === 'exist') {

                  let alert = this.alertCtrl.create({
                    title: 'User already Exists',
                    buttons: ['OK']
                  });
                  alert.present();

                }
                else if (status === 'failed') {
                  let alert = this.alertCtrl.create({
                    title: 'Registeration Failed ! Server Problem',
                    buttons: ['OK']
                  });
                  alert.present();
                }
                else {

                  const alert = this.alertCtrl.create({
                    title: 'Login to Continue',
                    buttons: ['OK']
                  });
                  alert.present();

                  this.navCtrl.setRoot(RegisterPage);

                }
              }, error => {
                console.log(error);// Error getting the data
              });

            },// Playerid completes
            error => console.error(error)
          );

          }

        })
        .catch((error: any) => {
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
    else {
      const alert = this.alertCtrl.create({
        title: 'Passwords do not Match',
        buttons: ['OK']
      });
      alert.present();
    }

  }


  resetPassword() {
    this.presentLoading('An e-mail was sent with your new password.');
  }

  registerpage() {
    this.value = '2';
  }

  loginpage() {
    this.value = '1';
  }

  forget() {
    this.value = '3';
  }

  backto() {
    this.value = '1';
  }


}
