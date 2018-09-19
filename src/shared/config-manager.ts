import { Injectable } from "@angular/core";

export class SystemSettings {
    public hostService = 'http://localhost:9001';
    public resourceService = 'http://localhost:5000';
    public enableAutoPlay = true;
    public enableCache = true;
}

@Injectable()
export class ConfigManager {
    settings: SystemSettings;

    public load(): void {
        const json = localStorage.getItem('settings');
        const item = JSON.parse(json);
        this.settings = <SystemSettings>item;
    }

    public save(): void {
        const json = JSON.stringify(this.settings);
        localStorage.setItem('settings', json);
    }
}