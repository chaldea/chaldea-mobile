import { Component, OnInit } from '@angular/core';
import { InfiniteScroll, NavController } from 'ionic-angular';

import { FavoriteDto, FavoriteServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { AppConsts } from '../../../shared/services/settings.service';
import { AnimeDetailPage } from '../../anime/anime-detail/anime-detail';

@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage implements OnInit {
  favorites: FavoriteDto[] = [];
  disableLoading = false;
  infiniteScroll: InfiniteScroll;
  appConsts = AppConsts;

  constructor(
    public navCtrl: NavController,
    public favoriteServiceProxy: FavoriteServiceProxy
  ) {
  }

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites(callback?: () => void): void {
    const self = this;
    self.favoriteServiceProxy.getFavorites(self.favorites.length, 6)
      .subscribe((rep) => {
        if (rep && rep.length > 0) {
          self.disableLoading = false;
          self.favorites = self.favorites.concat(rep);
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
    self.favorites = [];
    if (self.disableLoading) {
      self.infiniteScroll.enable(true);
    }
    self.getFavorites(() => {
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
    self.getFavorites(() => {
      console.log('loading...');
      infiniteScroll.complete();
    });
  }
}
