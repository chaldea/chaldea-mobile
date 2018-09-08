import { Component } from '@angular/core';

import { BangumiPage } from '../bangumi/bangumi';
import { UserPage } from '../user/user';
import { RecommendPage } from '../recommend/recommend';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabBangumi = BangumiPage;
  tabRecommend = RecommendPage;
  tabUser = UserPage;

  constructor() {

  }
}
