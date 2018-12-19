import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from '@angular/fire/database';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile = {} as Profile;
  value: any = '1';

  value1:any;
  value2:any;
  value3:any;
  value4:any;

  currencies = ['EUR', 'USD'];
  payPalEnvironment: string = 'payPalEnvironmentSandbox';

  payPalEnvironmentSandbox : any = 'AXg409-ZD7lFcgk2JdHkLkggX8u7LnT7cfkGL2AG0y7bx5OAvOmErpKKz5D68kzXRxbfe_KRlFf681rk';
  payPalEnvironmentProduction: any  = '';

  constructor(private payPal: PayPal, public alertCtrl: AlertController, private afDatabase : AngularFireDatabase, private nativeStorage: NativeStorage, private fire : AngularFireAuth ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  updateProfile(){
    this.value = '2';
    this.fire.authState.take(1).subscribe( auth => {
       this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
       .then(() => {

        // const alert = this.alertCtrl.create({
        //   title: 'Login to Continue',
        //   buttons: ['OK']
        // });
        // alert.present();
        // this.navCtrl.setRoot(RegisterPage);
    });
    })
  }

  next()
  {
   const alert = this.alertCtrl.create({
          title: 'Login to Continue',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(RegisterPage);
  }

  transaction()
  {
   let payment: PayPalPayment = new PayPalPayment(this.value1, this.value2, this.value3, this.value4);
   this.payPal.init({
     PayPalEnvironmentProduction: this.payPalEnvironmentProduction,
     PayPalEnvironmentSandbox: this.payPalEnvironmentSandbox
   }).then(() => {
     this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
       this.payPal.renderSinglePaymentUI(payment).then((response) => {
         alert(`Successfully paid. Status = ${response.response.state}`);
         console.log(response);
       }, () => {
         console.error('Error or render dialog closed without being successful');
       });
     }, () => {
       console.error('Error in configuration');
     });
   }, () => {
     console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
   });
  }
  
}
