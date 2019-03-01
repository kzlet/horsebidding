import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  items = [
    {
      name: 'What does EW mean?',
      description: 'If a bet is advised EW, this means each-way. When placing the bet, click EW on the betslip and this will double you stake to put half of your overall bet on the win and half of your overall bet on the place. You will get all the returns if the horse wins or just the place money if it places.',
      imageUrl: 'https://cdn-image.travelandleisure.com/sites/default/files/styles/964x524/public/1479915553/angra-dos-reis-brazil-WTG2017.jpg?itok=damBsB9G',
    },
    {
      name: 'How does the point system work?',
      description: 'We advise you pick an overall betting bank that you can afford – this can be £10, £100, £1000+. Whatever you feel comfortable with. We advise you have a betting bank of fifty points – therefore one point will be your betting bank divided by 50. So, for example, if you start with a betting bank of £100, 1 point will be £2. We will then advise between 1 to 3 points per bet generally.',
      imageUrl: 'https://cdn-image.travelandleisure.com/sites/default/files/styles/964x524/public/1480711606/belfast-city-hall-northern-ireland-WTG2017.jpg?itok=mCqumH31',
    },
    {
      name: 'Do you always win?',
      description: 'No - no one always wins – we are betting on animals at the end of the day. We have a proven profitable point system which will ensure you long term profits if you follow exactly what we say.',
      imageUrl: 'https://cdn-image.travelandleisure.com/sites/default/files/styles/964x524/public/1479487289/belgrade-serbia-fortress-WTG2017.jpg?itok=rw8c4Esh',
    },
    {
      name: 'How do I bet?',
      description: 'Simply take our information and use your own online or in-shop bookies to place the bet',
      imageUrl: 'https://cdn-image.travelandleisure.com/sites/default/files/styles/964x524/public/1479915553/hamilton-princess-bermuda-WTG2017.jpg?itok=E4sFyZFn',
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

}
