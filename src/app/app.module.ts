import 'rxjs/add/observable/fromEvent';

import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';

import { ComponentsModule } from '../components/components.module';
import { AboutPage } from '../pages/about/about';
import { AnimeDetailPage } from '../pages/anime/anime-detail/anime-detail';
import { AnimeListPage } from '../pages/anime/anime-list/anime-list';
import { BangumiPage } from '../pages/bangumi/bangumi';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { RecommendPage } from '../pages/recommend/recommend';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/user/login/login';
import { HostServiceSettingPage } from '../pages/user/settings/host-service-setting/host-service-setting';
import { ResourceServiceSettingPage } from '../pages/user/settings/resource-service-setting/resource-service-setting';
import { SettingsPage } from '../pages/user/settings/settings';
import { UserPage } from '../pages/user/user';
import { ConfigManager } from '../shared/config-manager';
import { API_BASE_URL } from '../shared/service-proxies/service-proxies';
import { ServiceProxyModule } from '../shared/service-proxies/service-proxy.module';
import { MyApp } from './app.component';

export function getRemoteServiceBaseUrl(injector: Injector): string {
    const config = injector.get(ConfigManager);
    config.load();
    return config.settings.hostService;
}

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        BangumiPage,
        AnimeListPage,
        AnimeDetailPage,
        UserPage,
        RecommendPage,
        SettingsPage,
        HostServiceSettingPage,
        ResourceServiceSettingPage,
        LoginPage
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: ''
        }),
        ComponentsModule.forRoot(),
        IonicImageLoader.forRoot(),
        ServiceProxyModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        BangumiPage,
        AnimeListPage,
        AnimeDetailPage,
        UserPage,
        RecommendPage,
        SettingsPage,
        HostServiceSettingPage,
        ResourceServiceSettingPage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        ConfigManager,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        {
            provide: API_BASE_URL,
            useFactory: getRemoteServiceBaseUrl,
            deps: [Injector]
        }
    ]
})
export class AppModule { }
