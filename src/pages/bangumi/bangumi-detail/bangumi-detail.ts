import { Component, Injector, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AnimeServiceProxy, Anime, AnimeDetail } from '../../../shared/service-proxies/service-proxies';
import { BasePage } from '../../base-page';
import { AppConsts } from '../../../shared/AppConsts';

@Component({
  selector: 'page-bangumi-detail',
  templateUrl: 'bangumi-detail.html',
})
export class BangumiDetailPage extends BasePage implements OnInit {
  segment: string = 'anime';
  animeInfo: Anime = new Anime();
  animeDetail: AnimeDetail = new AnimeDetail();
  title = '';
  cover = '';
  latest = '';
  tags = '';

  constructor(
    injector: Injector,
    public navCtrl: NavController,
    public navParams: NavParams,
    public animeServiceProxy: AnimeServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    const self = this;
    self.animeInfo = <Anime>self.navParams.data.anime;
    self.title = self.animeInfo.title;
    self.cover = `${AppConsts.appBaseUrl}/statics/imgs/covers/${self.animeInfo.cover}`;
    if (self.animeInfo) {
      self.animeServiceProxy.getdetail(self.animeInfo.id).subscribe((rep) => {
        self.animeDetail = rep;
        if (self.animeDetail.animes && self.animeDetail.animes.length > 0) {
          self.latest = self.animeDetail.animes[self.animeDetail.animes.length - 1].name;
        }
        if (self.animeDetail.tags && self.animeDetail.tags.length > 0) {
          self.tags = self.animeDetail.tags.join(' ');
        }
      });
    }
  }
}
