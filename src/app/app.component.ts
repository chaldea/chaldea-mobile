import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      if (platform.is('android')) {
        // screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
        statusBar.overlaysWebView(true);
        statusBar.backgroundColorByHexString('#ea7a99');
      }
      
      splashScreen.hide();
    });
  }
}
