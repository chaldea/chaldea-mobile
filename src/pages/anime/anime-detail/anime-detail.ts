import { Component, Injector, OnInit } from '@angular/core';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';

import {
  AnimeDto,
  AnimeServiceProxy,
  CommentAddDto,
  CommentDto,
  CommentServiceProxy,
  FavoriteServiceProxy
} from '../../../shared/service-proxies/service-proxies';
import { AppConsts } from '../../../shared/services/settings.service';
import { BasePage } from '../../base-page';

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
  comments: CommentDto[] = [];
  commentInput: CommentAddDto = new CommentAddDto();
  disableLoading = false;
  infiniteScroll: InfiniteScroll;

  constructor(
    injector: Injector,
    public navCtrl: NavController,
    public navParams: NavParams,
    public animeServiceProxy: AnimeServiceProxy,
    public favoriteServiceProxy: FavoriteServiceProxy,
    public commentServiceProxy: CommentServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    const self = this;
    self.animeId = self.navParams.data.animeId;
    if (self.animeId) {
      self.animeServiceProxy.getAnime(self.animeId).subscribe((rep) => {
        self.anime = rep;
        self.coverUrl = AppConsts.coverImgUrl + self.anime.cover;
        if (self.anime.videos && self.anime.videos.length > 0) {
          self.latest = self.anime.videos[self.anime.videos.length - 1].name;
        }
        if (self.anime.tags && self.anime.tags.length > 0) {
          self.tags = self.anime.tags.join(' ');
        }
      });
      self.getComments();
    }
  }

  subOrUnsub(animeId: string): void {
    const self = this;
    if (self.anime.isSubscribed) {
      self.favoriteServiceProxy.unSubscribe(animeId).subscribe(() => {
        self.anime.subCounts = self.anime.subCounts - 1;
        self.anime.isSubscribed = false;
      });
    } else {
      self.favoriteServiceProxy.subscribe(animeId).subscribe(() => {
        self.anime.subCounts = self.anime.subCounts + 1;
        self.anime.isSubscribed = true;
      });
    }
  }

  getComments(callback?: () => void): void {
    const self = this;
    self.commentServiceProxy.getComments(self.animeId, self.comments.length, 6)
      .subscribe((rep) => {
        if (rep && rep.length > 0) {
          self.disableLoading = false;
          self.comments = self.comments.concat(rep);
        }
        else {
          self.disableLoading = true;
        }
        if (callback) callback();
      });
  }

  sendComment(): void {
    const self = this;
    if (!self.commentInput.content || self.commentInput.content == '') {
      return;
    }
    self.commentInput.targetId = self.animeId;
    self.commentServiceProxy.addComment(self.commentInput).subscribe(() => {
      self.doRefresh();
    });
  }

  doRefresh(refresher?: any): void {
    const self = this;
    self.comments = [];
    if (self.disableLoading) {
      self.infiniteScroll.enable(true);
    }
    self.getComments(() => {
      if (refresher) {
        refresher.complete();
      }
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
    self.getComments(() => {
      console.log('loading...');
      infiniteScroll.complete();
    });
  }
}
