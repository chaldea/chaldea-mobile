import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PlayerComponent } from '../player/player';
import { Resource } from '../../shared/service-proxies/service-proxies';
import { AppConsts } from '../../shared/AppConsts';

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
    console.log(this.selected);
    const profileModal = this.modalCtrl.create(PlayerComponent, {
      src: `${AppConsts.resourceServer}/${resource.url}`,
      title: resource.name
    }, {
        showBackdrop: false
      }
    );
    profileModal.present();
  }
}
