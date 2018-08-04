import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { BangumiListPage } from './bangumi-list/bangumi-list';
import { BangumiDetailPage } from './bangumi-detail/bangumi-detail';

@Component({
  selector: 'page-bangumi',
  templateUrl: 'bangumi.html'
})
export class BangumiPage {
  @ViewChild("slides") slides: Slides;
  data: Array<any> = [];

  constructor(public navCtrl: NavController) {
    const baseUrl = "/assets/imgs/covers";
    this.data.push({
      date: "2018年7月",
      animes: [{
        img: `${baseUrl}/001.jpg`,
        title: "Phantom in the Twilight"
      }, {
        img: `${baseUrl}/002.jpg`,
        title: "Free男子游泳部第三季"
      }, {
        img: `${baseUrl}/003.jpg`,
        title: "烤肉店战国"
      }, {
        img: `${baseUrl}/004.jpg`,
        title: "深夜！天才傻鹏"
      }, {
        img: `${baseUrl}/005.jpg`,
        title: "元寇合战记"
      }, {
        img: `${baseUrl}/006.jpg`,
        title: "中间管理录利根川"
      }]
    }, {
        date: "2018年4月",
        animes: [{
          img: `${baseUrl}/007.jpg`,
          title: "后街女孩"
        }, {
          img: `${baseUrl}/008.jpg`,
          title: "千铳士"
        }, {
          img: `${baseUrl}/009.jpg`,
          title: "OVERLORD"
        }]
      });
  }

  ionViewDidEnter(): void {
    this.slides.startAutoplay();
  }

  ionViewWillLeave(): void {
    this.slides.stopAutoplay();
  }

  showBangumiList(): void {
    this.navCtrl.push(BangumiListPage);
  }

  showBangumiDetail(): void {
    this.navCtrl.push(BangumiDetailPage);
  }

  ionSlideAutoplayStop(): void {
    this.slides.startAutoplay();
  }
}
