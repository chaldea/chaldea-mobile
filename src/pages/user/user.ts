import { Component, Injector, OnDestroy } from '@angular/core';
import { AlertController, Events, ModalController, NavController } from 'ionic-angular';

import { TokenService } from '../../shared/services/token.service';
import { HistoryPage } from './history/history';
import { LoginPage } from './login/login';
import { SettingsPage } from './settings/settings';
import { AppConsts } from '../../shared/services/settings.service';
import { FavoritePage } from './favorite/favorite';
import { AchievementPage } from './achievement/achievement';
import { MessagePage } from './message/message';

@Component({
    selector: 'page-user',
    templateUrl: 'user.html'
})
export class UserPage implements OnDestroy {
    isLogin = false;
    avatar = AppConsts.userImgUrl + 'avatar.jpg';

    constructor(
        public injector: Injector,
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

    ngOnDestroy(): void {
        this.events.unsubscribe('logined');
    }

    showHistory(): void {
        this.navCtrl.push(HistoryPage);
    }

    showFavorite(): void {
        this.navCtrl.push(FavoritePage);
    }

    showAchievement(): void {
        this.navCtrl.push(AchievementPage);
    }

    showMessage(): void {
        this.navCtrl.push(MessagePage);
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
