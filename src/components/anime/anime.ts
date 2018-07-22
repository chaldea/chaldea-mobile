import { Component } from '@angular/core';

@Component({
  selector: 'anime',
  templateUrl: 'anime.html'
})
export class AnimeComponent {
  items: Array<any> = [];

  constructor() {
    console.log('binding....');
    for (var i = 0; i < 12; i++) {
      this.items.push({ name: `第${i + 1}话` });
    }

  }
}
