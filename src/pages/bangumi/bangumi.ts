import { Component, ViewChild, Injector, OnInit } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { BangumiListPage } from './bangumi-list/bangumi-list';
import { BangumiDetailPage } from './bangumi-detail/bangumi-detail';
import { BangumiServiceProxy, Bangumi } from '../../shared/service-proxies/service-proxies';
import { BasePage } from '../base-page';
import { AppConsts } from '../../shared/AppConsts';

@Component({
  selector: 'page-bangumi',
  templateUrl: 'bangumi.html'
})
export class BangumiPage extends BasePage implements OnInit {
  @ViewChild("slides") slides: Slides;
  bangumis: Bangumi[] = [];
  coverUrl = `${AppConsts.appBaseUrl}/statics/imgs/`;
  limit = 4;
  disableLoading = false;

  constructor(
    injector: Injector,
    public bangumiServiceProxy: BangumiServiceProxy,
    public navCtrl: NavController
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(callback?: () => void): void {
    const self = this;
    self.bangumiServiceProxy.getlist(self.bangumis.length, self.limit).subscribe((rep) => {
      if (rep && rep.length > 0) {
        self.disableLoading = false;
        self.bangumis = self.bangumis.concat(rep);
      }
      else {
        self.disableLoading = true;
      }

      if (callback) callback();
    });
  }

  ionViewDidEnter(): void {
    this.slides.startAutoplay();
  }

  ionViewWillLeave(): void {
    this.slides.stopAutoplay();
  }

  showAnimeList(bangumi: Bangumi): void {
    this.navCtrl.push(BangumiListPage, { bangumi: bangumi });
  }

  showBangumiDetail(): void {
    this.navCtrl.push(BangumiDetailPage);
  }

  ionSlideAutoplayStop(): void {
    this.slides.startAutoplay();
  }

  loading(infiniteScroll): void {
    const self = this;
    if (self.disableLoading) {
      infiniteScroll.enable(false);
      console.log('已经到最后');
      return;
    }
    self.getList(() => {
      console.log('loading...');
      infiniteScroll.complete();
    });
  }
}
