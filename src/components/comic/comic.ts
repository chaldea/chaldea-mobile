import { Component } from '@angular/core';

@Component({
  selector: 'comic',
  templateUrl: 'comic.html'
})
export class ComicComponent {
  items: Array<any> = [];

  constructor() {
    for (var i = 0; i < 12; i++) {
      this.items.push({ name: `第${i + 1}章` });
    }

  }
}
