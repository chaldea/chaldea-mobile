import { Component, Injector, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AnimeServiceProxy, Anime, AnimeDetail } from '../../../shared/service-proxies/service-proxies';
import { BasePage } from '../../base-page';

@Component({
  selector: 'page-bangumi-detail',
  templateUrl: 'bangumi-detail.html',
})
export class BangumiDetailPage extends BasePage implements OnInit {
  segment: string = 'anime';
  anime: Anime;
  animeDetail: AnimeDetail = new AnimeDetail();
  title = '';

  constructor(
    injector: Injector,
    public navCtrl: NavController,
    public navParams: NavParams,
    public animeServiceProxy: AnimeServiceProxy
  ) {
    super(injector);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BangumiDetailPage');
  }

  ngOnInit(): void {
    const self = this;
    self.anime = <Anime>self.navParams.data.anime;
    self.title = self.anime.title;
    console.log(self.anime);
    if (self.anime) {
      self.animeServiceProxy.getdetail(self.anime.id).subscribe((rep) => {
        self.animeDetail = rep;
      });
    }
  }
}
