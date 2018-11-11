import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppSettings, SettingsService } from '../../../../shared/services/settings.service';

@Component({
    selector: 'page-host-service-setting',
    templateUrl: 'host-service-setting.html',
})
export class HostServiceSettingPage {
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
