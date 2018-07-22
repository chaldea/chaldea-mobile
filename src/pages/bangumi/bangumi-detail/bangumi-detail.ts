import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-bangumi-detail',
  templateUrl: 'bangumi-detail.html',
})
export class BangumiDetailPage {
  segment: string = 'anime';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BangumiDetailPage');
  }

}
