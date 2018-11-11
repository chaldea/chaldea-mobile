import { Component } from '@angular/core';
import { NavController, ModalController, Events, AlertController } from 'ionic-angular';
import { SettingsPage } from './settings/settings';
import { LoginPage } from './login/login';
import { TokenService } from '../../shared/services/token.service';

@Component({
    selector: 'page-user',
    templateUrl: 'user.html'
})
export class UserPage {
    isLogin = false;

    constructor(
        public events: Events,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        public tokenService: TokenService
    ) {
        events.subscribe('logined', (arg) => {
            this.isLogin = arg;
        });
        this.isLogin = tokenService.hasToken();
    }

    showSettings(): void {
        this.navCtrl.push(SettingsPage);
    }

    register(): void {

    }

    login(): void {
        const profileModal = this.modalCtrl.create(LoginPage, {}, { showBackdrop: false });
        profileModal.present();
    }

    logout(): void {
        const confirm = this.alertCtrl.create({
            title: '确定不是踩到肥皂了?',
            message: '(ง •_•)ง (ง •_•)ง (ง •_•)ง',
            buttons: [
                {
                    text: '捡肥皂',
                    handler: () => {
                    }
                },
                {
                    text: '注销',
                    handler: () => {
                        this.tokenService.clean();
                        this.isLogin = false;
                    }
                }
            ]
        });
        confirm.present();
    }
}
