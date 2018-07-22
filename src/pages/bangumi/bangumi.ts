import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { BangumiListPage } from './bangumi-list/bangumi-list';
import { BangumiDetailPage } from './bangumi-detail/bangumi-detail';

@Component({
  selector: 'page-bangumi',
  templateUrl: 'bangumi.html'
})
export class BangumiPage {
  @ViewChild(Slides) slides: Slides;
  data: Array<any> = [];

  constructor(public navCtrl: NavController) {
    this.data.push({
      date: "2017年7月",
      animes: [{
        img: "xxxx.jpg",
        title: "魔法禁书目录"
      }, {
        img: "xxxx.jpg",
        title: "魔法禁书目录"
      }, {
        img: "xxxx.jpg",
        title: "魔法禁书目录"
      }, {
        img: "xxxx.jpg",
        title: "魔法禁书目录"
      }, {
        img: "xxxx.jpg",
        title: "魔法禁书目录"
      }, {
        img: "xxxx.jpg",
        title: "魔法禁书目录"
      }]
    }, {
        date: "2017年4月",
        animes: [{
          img: "xxxx.jpg",
          title: "魔法禁书目录"
        }, {
          img: "xxxx.jpg",
          title: "魔法禁书目录"
        }, {
          img: "xxxx.jpg",
          title: "魔法禁书目录"
        }]
      });
  }

  showBangumiList(): void {
    this.navCtrl.push(BangumiListPage);
  }

  showBangumiDetail(): void {
    this.navCtrl.push(BangumiDetailPage);
  }
}
