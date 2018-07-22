import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { BangumiPage } from '../bangumi/bangumi';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabBangumi = BangumiPage;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
