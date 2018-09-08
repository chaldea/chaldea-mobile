import { Component, OnInit, Injector } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BasePage } from '../base-page';

@Component({
    selector: 'page-recommend',
    templateUrl: 'recommend.html'
})
export class RecommendPage extends BasePage implements OnInit {
    recommands: any[];

    constructor(
        injector: Injector,
        public navCtrl: NavController
    ) {
        super(injector);
    }
    ngOnInit(): void {
        this.recommands = [
            { cover: './assets/imgs/pic_106.jpg', title: '美少女枪战三部曲' },
            { cover: './assets/imgs/pic_107.jpg', title: '白色的季节' },
            { cover: './assets/imgs/pic_110.jpg', title: '新海诚专辑' },
            { cover: './assets/imgs/pic_112.jpg', title: '吉卜力动画' },
            { cover: './assets/imgs/pic_113.jpg', title: '民工漫专题' }
        ];
    }
}
