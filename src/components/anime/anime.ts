import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PlayerComponent } from '../player/player';

@Component({
  selector: 'anime',
  templateUrl: 'anime.html'
})
export class AnimeComponent {
  items: Array<any> = [];

  constructor(public modalCtrl: ModalController) {
    for (var i = 0; i < 12; i++) {
      this.items.push({ name: `第${i + 1}话` });
    }

  }

  play(): void {
    const profileModal = this.modalCtrl.create(PlayerComponent, {
      src: "/assets/videos/sample.mp4",
      title: "测试标题"
    }, {
        showBackdrop: false
      }
    );
    profileModal.present();
  }
}
