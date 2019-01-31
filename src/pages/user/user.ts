import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AlertController, Events, ModalController, NavController } from 'ionic-angular';

import { UserServiceProxy, UserDetailDto } from '../../shared/service-proxies/service-proxies';
import { AppConsts } from '../../shared/services/settings.service';
import { TokenService } from '../../shared/services/token.service';
import { AchievementPage } from './achievement/achievement';
import { FavoritePage } from './favorite/favorite';
import { FeedbackPage } from './feedback/feedback';
import { HistoryPage } from './history/history';
import { LoginPage } from './login/login';
import { MessagePage } from './message/message';
import { SettingsPage } from './settings/settings';
import { BasePage } from '../base-page';

@Component({
    selector: 'page-user',
    templateUrl: 'user.html'
})
export class UserPage extends BasePage implements OnDestroy, OnInit {
    appConsts = AppConsts;
    user: UserDetailDto = new UserDetailDto();

    constructor(
        public injector: Injector,
        public events: Events,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController,
        public tokenService: TokenService,
        public userServiceProxy: UserServiceProxy
    ) {
        super(injector);
        events.subscribe('logined', (arg) => {
            this.isLogin = arg;
            this.getUserDetail();
        });
    }

    ngOnInit(): void {
        if (this.isLogin) {
            this.getUserDetail();
        }
    }

    ngOnDestroy(): void {
        this.events.unsubscribe('logined');
    }

    getUserDetail(): void {
        this.userServiceProxy.getUserDetail().subscribe((rep) => {
            this.user = rep;
            console.log(rep);
        });
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

    showFeedback(): void {
        this.navCtrl.push(FeedbackPage);
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
