import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { ConfigManager } from '../../shared/config-manager';
import {
  AnimeOutlineDto,
  BangumiAnimesDto,
  BangumiServiceProxy,
  Banner,
  BannerServiceProxy
} from '../../shared/service-proxies/service-proxies';
import { AnimeDetailPage } from '../anime/anime-detail/anime-detail';
import { AnimeListPage } from '../anime/anime-list/anime-list';
import { BasePage } from '../base-page';

@Component({
  selector: 'page-bangumi',
  templateUrl: 'bangumi.html'
})
export class BangumiPage extends BasePage implements OnInit {
  @ViewChild("slides") slides: Slides;
  bangumiAnimes: BangumiAnimesDto[] = [];
  banners: Banner[] = [];
  imgUrl = '';
  limit = 4;
  slice = 6;
  disableLoading = false;

  constructor(
    injector: Injector,
    public bangumiServiceProxy: BangumiServiceProxy,
    public bannerServiceProxy: BannerServiceProxy,
    public navCtrl: NavController,
    public config: ConfigManager
  ) {
    super(injector);
    this.imgUrl = `${config.settings.hostService}/statics/imgs/`;
  }

  ngOnInit(): void {
    this.getList();
    this.getBanners();
  }

  getList(callback?: () => void): void {
    const self = this;
    self.bangumiServiceProxy.getAnimes(self.bangumiAnimes.length, self.limit, self.slice).subscribe((rep) => {
      if (rep && rep.length > 0) {
        self.disableLoading = false;
        self.bangumiAnimes = self.bangumiAnimes.concat(rep);
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

  showBangumiList(bangumiAnimes: BangumiAnimesDto): void {
    this.navCtrl.push(AnimeListPage, { bangumiId: bangumiAnimes.id, bangumiName: bangumiAnimes.name });
  }

  showBangumiDetail(anime: AnimeOutlineDto): void {
    this.navCtrl.push(AnimeDetailPage, { animeId: anime.id });
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
