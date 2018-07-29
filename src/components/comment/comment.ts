import { Component } from '@angular/core';

@Component({
  selector: 'comment',
  templateUrl: 'comment.html'
})
export class CommentComponent {
  items: Array<any>;

  constructor() {
    this.items = [
      {
        auth: "最终的阿瓦隆",
        comment: "为什么需要一个评论区呢？这是一个问题。",
        praise: 123,
        unpraise: 1,
        level: 2333,
        date: "10天前"
      },
      {
        auth: "最终的阿瓦隆",
        comment: "为什么需要一个评论区呢？这是一个问题。",
        praise: 123,
        unpraise: 1,
        level: 2333,
        date: "10天前"
      },
      {
        auth: "最终的阿瓦隆",
        comment: "为什么需要一个评论区呢？这是一个问题。",
        praise: 123,
        unpraise: 1,
        level: 2333,
        date: "10天前"
      }
    ]
  }
}
