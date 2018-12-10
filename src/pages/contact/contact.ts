import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  @ViewChild('myInput') myInput: ElementRef;
  pet : any = 'email'; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

}
