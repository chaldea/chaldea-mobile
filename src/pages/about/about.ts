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
    const profileModal = this.modalCtrl.create(PlayerComponent, { userId: 8675309 });
    profileModal.present();
  }
}
