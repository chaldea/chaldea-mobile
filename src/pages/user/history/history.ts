import { Component, OnInit } from '@angular/core';
import { InfiniteScroll, NavController } from 'ionic-angular';

import { HistoryDetailDto, HistoryServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { AppConsts } from '../../../shared/services/settings.service';
import { AnimeDetailPage } from '../../anime/anime-detail/anime-detail';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage implements OnInit {
  histories: HistoryDetailDto[] = [];
  disableLoading = false;
  infiniteScroll: InfiniteScroll;
  appConsts = AppConsts;

  constructor(
    public navCtrl: NavController,
    public historyServiceProxy: HistoryServiceProxy
  ) {
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
    if (self.disableLoading) {
      self.infiniteScroll.enable(true);
    }
    self.getHistories(() => {
      refresher.complete();
    });
  }

  loading(infiniteScroll: InfiniteScroll): void {
    const self = this;
    if (self.disableLoading) {
      infiniteScroll.enable(false);
      self.infiniteScroll = infiniteScroll;
      console.log('已经到最后');
      return;
    }
    self.getHistories(() => {
      console.log('loading...');
      infiniteScroll.complete();
    });
  }
}
