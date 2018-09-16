import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';
import { ImageLoaderConfig } from 'ionic-image-loader';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    screenOrientation: ScreenOrientation,
    imageLoaderConfig: ImageLoaderConfig
  ) {
    platform.ready().then(() => {
      if (platform.is('android')) {
        // screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
        // statusBar.overlaysWebView(true);
        statusBar.backgroundColorByHexString('#ea7a99');
      }

      if (platform.is('cordova')) {
        imageLoaderConfig.setCacheDirectoryName('imgs');
        imageLoaderConfig.setImageReturnType('base64');
        imageLoaderConfig.concurrency = 18;
      }

      splashScreen.hide();
    });
  }
}
