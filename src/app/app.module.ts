import 'rxjs/add/observable/fromEvent';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
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
import { HistoryPage } from '../pages/user/history/history';
import { LoginPage } from '../pages/user/login/login';
import { HostServiceSettingPage } from '../pages/user/settings/host-service-setting/host-service-setting';
import { IdServiceSettingPage } from '../pages/user/settings/id-service-setting/id-service-setting';
import { ResourceServiceSettingPage } from '../pages/user/settings/resource-service-setting/resource-service-setting';
import { SettingsPage } from '../pages/user/settings/settings';
import { UserPage } from '../pages/user/user';
import { API_BASE_URL } from '../shared/service-proxies/service-proxies';
import { ServiceProxyModule } from '../shared/service-proxies/service-proxy.module';
import { AppSettings, SettingsService } from '../shared/services/settings.service';
import { RefreshTokenHttpInterceptor, TokenService } from '../shared/services/token.service';
import { MyApp } from './app.component';
import { TimePipe } from '../shared/services/time.pipe';

export function getRemoteServiceBaseUrl(): string {
    SettingsService.load();
    return AppSettings.apiServerUrl;
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
        IdServiceSettingPage,
        LoginPage,
        HistoryPage,
        TimePipe
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
        IdServiceSettingPage,
        LoginPage,
        HistoryPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        TokenService,
        SettingsService,
        { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenHttpInterceptor, multi: true },
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl }
    ]
})
export class AppModule { }
