import { Component, Injector, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AnimeServiceProxy, AnimeDto } from '../../../shared/service-proxies/service-proxies';
import { BasePage } from '../../base-page';
import { AppSettings } from '../../../shared/services/settings.service';

@Component({
  selector: 'page-anime-detail',
  templateUrl: 'anime-detail.html',
})
export class AnimeDetailPage extends BasePage implements OnInit {
  segment: string = 'video-page';
  animeId: string;
  anime: AnimeDto = new AnimeDto();
  coverUrl: string;
  latest: string;
  tags: string;

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
    self.animeId = self.navParams.data.animeId;
    if (self.animeId) {
      self.animeServiceProxy.getAnime(self.animeId).subscribe((rep) => {
        self.anime = rep;
        self.coverUrl = `${AppSettings.apiServerUrl}/statics/imgs/${self.anime.cover}`;
        if (self.anime.videos && self.anime.videos.length > 0) {
          self.latest = self.anime.videos[self.anime.videos.length - 1].name;
        }
        if (self.anime.tags && self.anime.tags.length > 0) {
          self.tags = self.anime.tags.join(' ');
        }
      });
    }
  }
}
