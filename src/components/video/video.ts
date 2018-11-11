import { Component, Input, OnInit, Injector } from '@angular/core';
import { Events, ModalController } from 'ionic-angular';

import { HistoryDto, HistoryServiceProxy, Resource, VideoServiceProxy } from '../../shared/service-proxies/service-proxies';
import { PlayerComponent } from '../player/player';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-video',
  templateUrl: 'video.html'
})
export class VideoComponent extends BaseComponent implements OnInit {
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
    events.subscribe('videoStopped', (arg) => {
      const history = new HistoryDto();
      history.animeId = self.animeId;
      history.resourceId = self.selected.id;
      history.currentTime = Math.floor(arg);
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
            res['visited'] = true;
            if (i === rep.length - 1) {
              self.selected = res;
            }
          });
        }
      });
    }
  }

  play(resource: Resource): void {
    this.selected = resource;
    this.videoServiceProxy.getVideoForPlayer(this.animeId, resource.id).subscribe((video) => {
      const profileModal = this.modalCtrl.create(PlayerComponent, {
        video: video
      }, {
          showBackdrop: false
        }
      );
      profileModal.present();
    });
  }
}

