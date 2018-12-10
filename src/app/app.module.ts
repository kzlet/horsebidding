import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//firebase setup
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegisterPage } from '../pages/register/register';
import { BookieOfferPage } from '../pages/bookie-offer/bookie-offer';
import { ChatGroupsPage } from '../pages/chat-groups/chat-groups';
import { ContactPage } from '../pages/contact/contact';
import { EventsPage } from '../pages/events/events';
import { FaqPage } from '../pages/faq/faq';
import { SettingsPage } from '../pages/settings/settings';



const firebaseAuth = {
  apiKey: "AIzaSyCFwDbNDY57dnNbV7cLLvfNoQaqiZbv2WY",
  authDomain: "horse-b2912.firebaseapp.com",
  databaseURL: "https://horse-b2912.firebaseio.com",
  projectId: "horse-b2912",
  storageBucket: "",
  messagingSenderId: "599593590127"
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
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule
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
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
