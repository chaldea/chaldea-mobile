import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HistoryDetailDto, HistoryServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { AppSettings } from '../../../shared/services/settings.service';
import { AnimeDetailPage } from '../../anime/anime-detail/anime-detail';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage implements OnInit {
  histories: HistoryDetailDto[] = [];
  imgUrl: string;
  disableLoading = false;

  constructor(
    public navCtrl: NavController,
    public historyServiceProxy: HistoryServiceProxy
  ) {
    this.imgUrl = `${AppSettings.apiServerUrl}/statics/imgs/history/`;
  }

  ngOnInit(): void {
    this.getHistories();
  }

  getHistories(callback?: () => void): void {
    const self = this;
    self.historyServiceProxy.getHistories(self.histories.length, 6)
      .subscribe((rep) => {
        if (rep && rep.length > 0) {
          self.disableLoading = false;
          self.histories = self.histories.concat(rep);
        }
        else {
          self.disableLoading = true;
        }
        if (callback) callback();
      });
  }

  showAnime(animeId: string): void {
    this.navCtrl.push(AnimeDetailPage, { animeId: animeId });
  }

  doRefresh(refresher): void {
    const self = this;
    self.histories = [];
    self.getHistories(() => {
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
    self.getHistories(() => {
      console.log('loading...');
      infiniteScroll.complete();
    });
  }
}
