import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PlayerComponent } from '../player/player';
import { Resource } from '../../shared/service-proxies/service-proxies';

@Component({
  selector: 'anime',
  templateUrl: 'anime.html'
})
export class AnimeComponent {
  @Input() resources: Resource[];
  selected: Resource;

  constructor(public modalCtrl: ModalController) {
  }

  play(resource: Resource): void {
    this.selected = resource;
    const profileModal = this.modalCtrl.create(PlayerComponent, {
      data: resource
    }, {
        showBackdrop: false
      }
    );
    profileModal.present();
  }
}

