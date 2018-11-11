import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';

import { AppSettings } from '../../../shared/services/settings.service';
import { TokenDto, TokenService } from '../../../shared/services/token.service';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    userName = '';
    password = '';

    constructor(
        public events: Events,
        public navCtrl: NavController,
        private httpClient: HttpClient,
        private tokenService: TokenService
    ) {

    }

    login(): void {
        const body = new FormData();
        body.append('username', this.userName);
        body.append('password', this.password);
        body.append('grant_type', 'password');
        body.append('client_id', AppSettings.clientId);
        body.append('client_secret', AppSettings.clientSecret);
        this.httpClient.post(`${AppSettings.idServerUrl}/connect/token`, body)
            .subscribe((rep) => {
                console.log(rep);
                this.tokenService.setToken(<TokenDto>rep);
                this.events.publish('logined', true);
                this.navCtrl.pop();
            }, (error) => {
                console.log(error);
            });
    }

    goBack(): void {
        this.navCtrl.pop();
    }
}