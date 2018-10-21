import { Component } from '@angular/core';

@Component({
  selector: 'app-novel',
  templateUrl: 'novel.html'
})
export class NovelComponent {
  items: Array<any> = [];

  constructor() {
    for (var i = 0; i < 12; i++) {
      this.items.push({ name: `第${i + 1}卷` });
    }

  }
}
