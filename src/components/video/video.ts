import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PlayerComponent } from '../player/player';
import { Resource, VideoServiceProxy } from '../../shared/service-proxies/service-proxies';

@Component({
  selector: 'app-video',
  templateUrl: 'video.html'
})
export class VideoComponent {
  @Input() resources: Resource[];
  selected: Resource;

  constructor(
    public modalCtrl: ModalController,
    private videoServiceProxy: VideoServiceProxy
  ) {
  }

  play(resource: Resource): void {
    this.selected = resource;
    this.videoServiceProxy.getVideo(resource.id).subscribe((video) => {
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

