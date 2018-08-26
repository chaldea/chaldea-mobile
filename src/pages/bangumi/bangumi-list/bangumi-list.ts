import { Component, Injector, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BasePage } from '../../base-page';
import { AnimeServiceProxy, Anime, Bangumi } from '../../../shared/service-proxies/service-proxies';
import { AppConsts } from '../../../shared/AppConsts';

@Component({
  selector: 'page-bangumi-list',
  templateUrl: 'bangumi-list.html'
})
export class BangumiListPage extends BasePage implements OnInit {
  bangumi: Bangumi;
  animes: Anime[] = [];
  coverUrl = `${AppConsts.appBaseUrl}/statics/imgs/covers/`;
  limit = 12;
  disableLoading = false;

  constructor(
    injector: Injector,
    public navCtrl: NavController,
    public navParams: NavParams,
    public animeServiceProxy: AnimeServiceProxy
  ) {
    super(injector);
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
