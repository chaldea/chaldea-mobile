import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ConfigManager, SystemSettings } from '../../../../shared/config-manager';

@Component({
    selector: 'page-resource-service-setting',
    templateUrl: 'resource-service-setting.html',
})
export class ResourceServiceSettingPage {
    setting: SystemSettings;

    constructor(
        public navCtrl: NavController,
        public config: ConfigManager
    ) {
        this.setting = this.config.settings;
    }

    save(): void {
        this.config.save();
        this.navCtrl.pop();
    }
}
