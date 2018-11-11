import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppSettings, SettingsService } from '../../../shared/services/settings.service';
import { HostServiceSettingPage } from './host-service-setting/host-service-setting';
import { IdServiceSettingPage } from './id-service-setting/id-service-setting';
import { ResourceServiceSettingPage } from './resource-service-setting/resource-service-setting';
import { NodeServiceProxy, DropdownItem } from '../../../shared/service-proxies/service-proxies';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {
  setting = AppSettings;
  nodes: DropdownItem[];

  constructor(
    public navCtrl: NavController,
    public nodeServiceProxy: NodeServiceProxy
  ) {
  }

  ngOnInit(): void {
    this.getNodes();
  }

  getNodes(): void {
    this.nodeServiceProxy.getNodes().subscribe((rep) => {
      const data = rep.map(x => {
        const item = new DropdownItem();
        item.text = `http://${x.ip}:9001`;
        item.value = `http://${x.ip}:9001`;
        return item;
      });
      this.nodes = data;
    });
  }

  selectNode(): void {
    SettingsService.save();
  }

  showIdSetting(): void {
    this.navCtrl.push(IdServiceSettingPage);
  }

  showHostSetting(): void {
    this.navCtrl.push(HostServiceSettingPage);
  }

  showResourceSetting(): void {
    this.navCtrl.push(ResourceServiceSettingPage);
  }

  enableAutoPlay(): void {
    SettingsService.save();
  }

  enableCache(): void {
    SettingsService.save();
  }
}
