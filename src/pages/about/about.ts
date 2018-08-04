import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { PlayerComponent } from '../../components/player/player';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

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
