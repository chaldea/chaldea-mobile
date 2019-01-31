import { Component, Input, OnInit, Injector, OnDestroy } from '@angular/core';
import { Events, ModalController } from 'ionic-angular';

import { HistoryDto, HistoryServiceProxy, Resource, VideoServiceProxy } from '../../shared/service-proxies/service-proxies';
import { PlayerComponent } from '../player/player';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-video',
  templateUrl: 'video.html'
})
export class VideoComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() animeId: string;
  @Input() resources: Resource[];
  selected: Resource;

  constructor(
    public injector: Injector,
    public events: Events,
    public modalCtrl: ModalController,
    private historyServiceProxy: HistoryServiceProxy,
    private videoServiceProxy: VideoServiceProxy
  ) {
    super(injector);
    const self = this;
    events.subscribe('videoStopped', (data) => {
      console.log('Event videoStopped is triggered.');
      if (!self.selected) return;
      const history = new HistoryDto();
      history.animeId = self.animeId;
      history.resourceId = self.selected.id;
      history.currentTime = Math.floor(data.currentTime);
      history.screenshot = data.screenshot;
      history.duration = data.duration;
      history.sourceTitle = data.sourceTitle;
      historyServiceProxy.addOrUpdateHistory(history).subscribe(() => {
        console.log('add history successfully.');
      });
    });
  }

  ngOnInit(): void {
    const self = this;
    if (self.isLogin) {
      self.historyServiceProxy.getAnimeHistories(self.animeId).subscribe((rep) => {
        if (rep && rep.length > 0) {
          rep.forEach((item, i) => {
            const res = self.resources.find(x => x.id === item.resourceId);
            if (res) {
              res['visited'] = true;
              if (i === rep.length - 1) {
                self.selected = res;
              }
            }
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('videoStopped');
    console.log('Event videoStopped is unsubscribed.');
  }

  play(resource: Resource): void {
    const self = this;
    resource['visited'] = true;
    self.selected = resource;
    self.videoServiceProxy.getVideoForPlayer(self.animeId, resource.id).subscribe((video) => {
      const profileModal = self.modalCtrl.create(PlayerComponent, {
        video: video
      }, {
          showBackdrop: false
        }
      );
      profileModal.present();
    });
  }
}

