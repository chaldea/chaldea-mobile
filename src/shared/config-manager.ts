import { Injectable } from "@angular/core";

export class SystemSettings {
    public hostService = 'http://101.132.113.66:9001';
    public resourceService = 'http://192.168.1.100';
    public enableAutoPlay = true;
    public enableCache = true;
}

@Injectable()
export class ConfigManager {
    settings: SystemSettings;

    public load(): void {
        const json = localStorage.getItem('settings');
        if (json && json !== '') {
            const item = JSON.parse(json);
            this.settings = <SystemSettings>item;
        } else {
            this.settings = new SystemSettings();
        }
    }

    public save(): void {
        const json = JSON.stringify(this.settings);
        localStorage.setItem('settings', json);
    }
}