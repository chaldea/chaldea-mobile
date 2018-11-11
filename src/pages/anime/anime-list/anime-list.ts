import { Component, Injector, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AnimeServiceProxy, AnimeOutlineDto } from '../../../shared/service-proxies/service-proxies';
import { BasePage } from '../../base-page';
import { AnimeDetailPage } from '../anime-detail/anime-detail';
import { AppSettings } from '../../../shared/services/settings.service';

@Component({
  selector: 'page-anime-list',
  templateUrl: 'anime-list.html'
})
export class AnimeListPage extends BasePage implements OnInit {
  animes: AnimeOutlineDto[] = [];
  bangumiId = '';
  bangumiName = '';
  imgUrl = '';
  limit = 12;
  disableLoading = false;

  constructor(
    injector: Injector,
    public navCtrl: NavController,
    public navParams: NavParams,
    public animeServiceProxy: AnimeServiceProxy
  ) {
    super(injector);
    this.imgUrl = `${AppSettings.apiServerUrl}/statics/imgs/`;
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(callback?: () => void): void {
    const self = this;
    self.bangumiId = self.navParams.data.bangumiId;
    self.bangumiName = self.navParams.data.bangumiName;
    if (self.bangumiId) {
      self.animeServiceProxy.getList(self.bangumiId, self.animes.length, self.limit).subscribe((rep) => {
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

  showBangumiDetail(anime: AnimeOutlineDto): void {
    this.navCtrl.push(AnimeDetailPage, { animeId: anime.id });
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
