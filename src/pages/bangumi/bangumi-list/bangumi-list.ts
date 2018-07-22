import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-bangumi-list',
  templateUrl: 'bangumi-list.html'
})
export class BangumiListPage {
  animes: Array<any>;

  constructor(public navCtrl: NavController) {
    this.animes = [{
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }, {
      img: "xxxx.jpg",
      title: "魔法禁书目录"
    }]
  }
}
