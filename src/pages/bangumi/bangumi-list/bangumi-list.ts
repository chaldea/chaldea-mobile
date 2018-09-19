import { Component, Injector, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Anime, AnimeServiceProxy, Bangumi } from '../../../shared/service-proxies/service-proxies';
import { BasePage } from '../../base-page';
import { BangumiDetailPage } from '../bangumi-detail/bangumi-detail';
import { ConfigManager } from '../../../shared/config-manager';

@Component({
  selector: 'page-bangumi-list',
  templateUrl: 'bangumi-list.html'
})
export class BangumiListPage extends BasePage implements OnInit {
  bangumi: Bangumi;
  animes: Anime[] = [];
  coverUrl: string;
  limit = 12;
  disableLoading = false;

  constructor(
    injector: Injector,
    public navCtrl: NavController,
    public navParams: NavParams,
    public animeServiceProxy: AnimeServiceProxy,
    public config: ConfigManager
  ) {
    super(injector);
    this.coverUrl = `${config.settings.hostService}/statics/imgs/covers/`;
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(callback?: () => void): void {
    const self = this;
    self.bangumi = <Bangumi>self.navParams.data.bangumi;
    if (self.bangumi && self.bangumi.id) {
      self.animeServiceProxy.getlist(self.bangumi.id, self.animes.length, self.limit).subscribe((rep) => {
        if (rep && rep.length > 0) {
          self.disableLoading = false;
          self.animes = self.animes.concat(rep);
        }
        else {
          self.disableLoading = true;
        }

        if (callback) callback();
      });
    }
  }

  showBangumiDetail(anime: Anime): void {
    this.navCtrl.push(BangumiDetailPage, { anime: anime });
  }

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
