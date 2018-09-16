import 'rxjs/add/observable/fromEvent';

import { HttpClientModule } from '@angular/common/http';
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
import { BangumiPage } from '../pages/bangumi/bangumi';
import { BangumiDetailPage } from '../pages/bangumi/bangumi-detail/bangumi-detail';
import { BangumiListPage } from '../pages/bangumi/bangumi-list/bangumi-list';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { RecommendPage } from '../pages/recommend/recommend';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';
import { AppConsts } from '../shared/AppConsts';
import { API_BASE_URL } from '../shared/service-proxies/service-proxies';
import { ServiceProxyModule } from '../shared/service-proxies/service-proxy.module';
import { MyApp } from './app.component';

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
        UserPage,
        RecommendPage
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
        BangumiListPage,
        BangumiDetailPage,
        UserPage,
        RecommendPage
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
