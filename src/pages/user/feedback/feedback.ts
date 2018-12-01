import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { FeedbackDto, FeedbackServiceProxy } from '../../../shared/service-proxies/service-proxies';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  input: FeedbackDto = new FeedbackDto();

  constructor(
    public feedbackServiceProxy: FeedbackServiceProxy,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {
    this.input.advice = '';
  }

  send(): void {
    const self = this;
    self.feedbackServiceProxy.addFeedback(self.input).subscribe(() => {
      const confirm = self.alertCtrl.create({
        title: '感谢您的反馈意见',
        message: 'ฅʕ•̫͡•ʔฅ ฅʕ•̫͡•ʔฅ ฅʕ•̫͡•ʔฅ',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              self.navCtrl.pop();
            }
          }
        ]
      });
      confirm.present();
    });
  }
}
