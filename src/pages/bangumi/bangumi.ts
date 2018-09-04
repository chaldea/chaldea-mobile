import { Component, ViewChild, Injector, OnInit } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { BangumiListPage } from './bangumi-list/bangumi-list';
import { BangumiDetailPage } from './bangumi-detail/bangumi-detail';
import { BangumiServiceProxy, Bangumi, Anime, BannerServiceProxy, Banner } from '../../shared/service-proxies/service-proxies';
import { BasePage } from '../base-page';
import { AppConsts } from '../../shared/AppConsts';

@Component({
  selector: 'page-bangumi',
  templateUrl: 'bangumi.html'
})
export class BangumiPage extends BasePage implements OnInit {
  @ViewChild("slides") slides: Slides;
  bangumis: Bangumi[] = [];
  banners: Banner[] = [];
  coverUrl = `${AppConsts.appBaseUrl}/statics/imgs/covers/`;
  bannerUrl = `${AppConsts.appBaseUrl}/statics/imgs/banners/`;
  limit = 4;
  disableLoading = false;

  constructor(
    injector: Injector,
    public bangumiServiceProxy: BangumiServiceProxy,
    public bannerServiceProxy: BannerServiceProxy,
    public navCtrl: NavController
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getList();
    this.getBanners();
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

  getBanners(): void {
    const self = this;
    self.bannerServiceProxy.getList(0, 3).subscribe((rep) => {
      self.banners = rep;
      // this.slides.startAutoplay();
    });
  }

  // ngAfterViewInit() {
  //   this.slides.startAutoplay();
  // }

  // ionViewDidEnter(): void {
  //   this.slides.startAutoplay();
  // }

  // ionViewWillLeave(): void {
  //   this.slides.stopAutoplay();
  // }

  showBangumiList(bangumi: Bangumi): void {
    this.navCtrl.push(BangumiListPage, { bangumi: bangumi });
  }

  showBangumiDetail(anime: Anime): void {
    this.navCtrl.push(BangumiDetailPage, { anime: anime });
  }

  // ionSlideAutoplayStop(): void {
  //   this.slides.startAutoplay();
  // }

  doRefresh(refresher): void {
    const self = this;
    self.getList(() => {
      refresher.complete();
    });
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
