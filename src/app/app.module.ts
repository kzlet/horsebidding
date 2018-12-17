import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { BookieOfferPage } from '../pages/bookie-offer/bookie-offer';
import { ChatGroupsPage } from '../pages/chat-groups/chat-groups';
import { ContactPage } from '../pages/contact/contact';
import { EventsPage } from '../pages/events/events';
import { FaqPage } from '../pages/faq/faq';
import { SettingsPage } from '../pages/settings/settings';
import { NativeStorage } from '@ionic-native/native-storage';

//firebase setup
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Firebase } from '@ionic-native/firebase';
import { AddroomPage } from '../pages/addroom/addroom';
import { ChatPage } from '../pages/chat/chat';

//to upload files in chat
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

//for audio capture messages
import { Media } from '@ionic-native/media';
import { AudioPage } from '../pages/audio/audio';
import { AdminchatPage } from '../pages/adminchat/adminchat';
import { PaypalPage } from '../pages/paypal/paypal';

//Paypal Integration
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { ProfilePage } from '../pages/profile/profile';

//kumail-horse (firebase project name)
const firebaseAuth = {
  apiKey: "AIzaSyBu6m7gEDyIHPLEFaIw87Nkikf9t8F9H_U",
    authDomain: "kumail-horse.firebaseapp.com",
    databaseURL: "https://kumail-horse.firebaseio.com",
    projectId: "kumail-horse",
    storageBucket: "gs://kumail-horse.appspot.com/",
    messagingSenderId: "896600085936"
};



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    BookieOfferPage,
    ChatGroupsPage,
    ContactPage,
    EventsPage,
    FaqPage,
    SettingsPage,
    AddroomPage,
    ChatPage,
    AudioPage,
    AdminchatPage,
    PaypalPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    BookieOfferPage,
    ChatGroupsPage,
    ContactPage,
    EventsPage,
    FaqPage,
    SettingsPage,
    AddroomPage,
    ChatPage,
    AudioPage,
    AdminchatPage,
    PaypalPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseAuthentication,
    Firebase,
    NativeStorage,
    File,
    FileChooser,
    FileTransfer,
    FileTransferObject,
    Camera,
    Media,
    PayPal,
    //PayPalPayment,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
