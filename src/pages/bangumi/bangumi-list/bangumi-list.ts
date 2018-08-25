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
  coverUrl = `${AppConsts.appBaseUrl}/statics/imgs/`;

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

  getList(): void {
    const self = this;
    self.bangumi = <Bangumi>self.navParams.data.bangumi;
    if (self.bangumi && self.bangumi.id) {
      self.animeServiceProxy.getlist(self.bangumi.id).subscribe((rep) => {
        self.animes = rep;
      });
    }
  }
}
