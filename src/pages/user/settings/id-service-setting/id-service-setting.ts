import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppSettings, SettingsService } from '../../../../shared/services/settings.service';

@Component({
    selector: 'page-id-service-setting',
    templateUrl: 'id-service-setting.html',
})
export class IdServiceSettingPage {
    setting = AppSettings;

    constructor(
        public navCtrl: NavController
    ) {
    }

    save(): void {
        SettingsService.save();
        this.navCtrl.pop();
    }
}
