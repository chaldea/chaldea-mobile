import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BangumiPage } from '../pages/bangumi/bangumi';
import { BangumiListPage } from '../pages/bangumi/bangumi-list/bangumi-list';
import { BangumiDetailPage } from '../pages/bangumi/bangumi-detail/bangumi-detail';
import { ComponentsModule } from '../components/components.module';
import { UserPage } from '../pages/user/user';
import { API_BASE_URL } from '../shared/service-proxies/service-proxies';
import { ServiceProxyModule } from '../shared/service-proxies/service-proxy.module';
import { AppConsts } from '../shared/AppConsts';

export function getRemoteServiceBaseUrl(): string {
    return AppConsts.appBaseUrl;
}

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        BangumiPage,
        BangumiListPage,
        BangumiDetailPage,
        UserPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: ''
        }),
        ComponentsModule.forRoot(),
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
        BangumiListPage,
        BangumiDetailPage,
        UserPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl }
    ]
})
export class AppModule { }
