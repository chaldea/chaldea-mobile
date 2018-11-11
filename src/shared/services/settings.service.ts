export class AppSettings {
    static apiServerUrl = 'http://localhost:9001';
    static idServerUrl = 'http://localhost:9000';
    static resServerUrl = 'http://192.168.1.100';
    static clientId = 'chaldea-mobile';
    static clientSecret = '613b807c57a641e881be80c6333de409';
    static enableAutoPlay = true;
    static enableCache = true;
}

export class SettingsService {
    public static load(): void {
        const json = localStorage.getItem('settings');
        if (json) {
            const item = JSON.parse(json);
            if (item) {
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        AppSettings[key] = item[key];
                    }
                }
            }
        } else {
            this.save();
        }
    }

    public static save(): void {
        const item = {};
        for (const key in AppSettings) {
            if (AppSettings.hasOwnProperty(key)) {
                item[key] = AppSettings[key];
            }
        }
        localStorage.setItem('settings', JSON.stringify(item));
    }
}