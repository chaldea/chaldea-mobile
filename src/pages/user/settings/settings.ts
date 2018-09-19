import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ConfigManager, SystemSettings } from '../../../shared/config-manager';
import { HostServiceSettingPage } from './host-service-setting/host-service-setting';
import { ResourceServiceSettingPage } from './resource-service-setting/resource-service-setting';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  setting: SystemSettings;

  constructor(
    public navCtrl: NavController,
    public config: ConfigManager
  ) {
    this.setting = config.settings;
  }

  showHostSetting(): void {
    this.navCtrl.push(HostServiceSettingPage);
  }

  showResourceSetting(): void {
    this.navCtrl.push(ResourceServiceSettingPage);
  }

  enableAutoPlay(): void {
    this.config.save();
  }

  enableCache(): void {
    this.config.save();
  }
}
